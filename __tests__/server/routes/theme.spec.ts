
import { expect } from 'chai';
import * as fs from 'fs';
import 'mocha';
import * as sinon from 'sinon';
import { S3Client } from '../../../server/infrastructure/storageService';
import { ThemeProvider } from '../../../server/infrastructure/themeProvider';
import createRoutes from '../../../server/routes/theme';
import logger from '../utils/consoleLogger';
import { get, post } from '../utils/httpClient';
import { addUser } from '../utils/mockedExpressMiddleware';
import createTestHost, { TestHost } from '../utils/testHost';

describe('theme route tests', () => {
    describe('when not authorized', () => {
        let testHost: TestHost;
        let sandbox: sinon.SinonSandbox;

        before(() => {
            sandbox = sinon.createSandbox();
            testHost = createTestHost();
            const mockedThemeProvider = new ThemeProvider('fakedir', sandbox.createStubInstance(S3Client), logger);
            testHost.express.use('/api', createRoutes(mockedThemeProvider, logger));
            testHost.listen();
        });

        after(async () => {
            sandbox.restore();
            await testHost.close();
        });

        it('should return a 403 for retrieving a theme', async () => {
            const response = await get('http://localhost:1234/api/100/theme');
            expect(response.statusCode).to.equal(403);
        });

        it('should return a 403 for uploading a theme', async () => {
            const response = await post('http://localhost:1234/api/100/theme');
            expect(response.statusCode).to.equal(403);
        });
    });

    describe('When authorized', () => {
        let testHost: TestHost;
        let sandbox: sinon.SinonSandbox;

        const setupAndStartTestHost = (themeProvider?: ThemeProvider) => {
            sandbox = sinon.createSandbox();
            if (!themeProvider) {
                themeProvider = new ThemeProvider('fakedir', sandbox.createStubInstance(S3Client), logger);
                sandbox.stub(themeProvider, 'newOrUpdate').resolves();
                sandbox.stub(themeProvider, 'getThemeFor').resolves(null);
            }

            testHost = createTestHost();
            testHost.express.use('/api', addUser({ tenants: [ { tenantId: '100' } ] }),
                createRoutes(themeProvider, logger));
            testHost.listen();
        };

        const stopTestHost = () => {
            return new Promise((res) => {
                sandbox.restore();
                testHost.close(res);
            });
        };

        describe('when retrieving', () => {
            it('should return 404 when no theme is available', async () => {
                setupAndStartTestHost();
                const response = await get('http://localhost:1234/api/100/theme');
                expect(response.statusCode).to.equal(404);
                stopTestHost();
            });

            it('should return the theme when a theme is available', async () => {
                const themeProvider = new ThemeProvider('fakedir', sandbox.createStubInstance(S3Client), logger);
                sandbox.stub(themeProvider, 'getThemeFor').resolves('layout.hbs');
                setupAndStartTestHost(themeProvider);
                const response = await get('http://localhost:1234/api/100/theme');
                expect(response.statusCode).to.equal(200);
                expect(JSON.parse(response.body).theme).to.equal('layout.hbs');
                await stopTestHost();
            });
        });

        describe('when uploading', () => {
            beforeEach(() => setupAndStartTestHost());
            afterEach(async () => await stopTestHost());

            it('should return 400 when uploading a theme that is not a zip file', async () => {
                const response = await post(`http://localhost:1234/api/100/theme`);
                expect(response.statusCode).to.equal(400);
                expect(JSON.parse(response.body).validationErrors).to.have.length(1);
            });

            it('should return 200 when uploading a theme that is a zip', async () => {
                const response = await post(`http://localhost:1234/api/100/theme`, {
                    formData: {
                        originalname: 'theme.zip',
                        file: fs.createReadStream(__dirname + '/../../../example-data/theme/theme.zip'),
                    },
                });
                expect(response.statusCode).to.equal(200);
            });
        });
    });
});
