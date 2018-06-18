
import { expect } from 'chai';
import 'mocha';
import * as mockgoose from 'mockgoose';
import { Mockgoose } from 'mockgoose';
import { ContentPageModel } from '../../../server/db';
import createRoutes from '../../../server/routes/contentPages';
import logger from '../utils/consoleLogger';
import { del, get, post, put } from '../utils/httpClient';
import { addUser } from '../utils/mockedExpressMiddleware';
import { initializeInMemoryMondoDb, MongoConnection } from '../utils/mockedMongoDb';
import createTestHost, { TestHost } from '../utils/testHost';

describe('content pages route tests', () => {
    describe('when not authorized', () => {
        let testHost: TestHost;

        before(() => {
            testHost = createTestHost();
            testHost.express.use('/api', createRoutes(ContentPageModel, logger));
            testHost.listen();
        });

        it('should return a 403 for all contentpages', async () => {
            const response = await get('http://localhost:1234/api/100/contentpages');
            expect(response.statusCode).to.equal(403);
        });

        it('should return a 403 for adding a content page', async () => {
            const response = await post('http://localhost:1234/api/100/contentpages', {});
            expect(response.statusCode).to.equal(403);
        });

        it('should return a 403 for updating a content page', async () => {
            const response = await put('http://localhost:1234/api/100/contentpages/6789', {});
            expect(response.statusCode).to.equal(403);
        });

        it('should return a 403 for getting a content page', async () => {
            const response = await get('http://localhost:1234/api/100/contentpages/6789');
            expect(response.statusCode).to.equal(403);
        });

        it('should return a 403 for deleting a content page', async () => {
            const response = await del('http://localhost:1234/api/100/contentpages/6789');
            expect(response.statusCode).to.equal(403);
        });

        after((done) => {
            testHost.close(done);
        });
    });

    describe('When authorized', () => {
        let testHost: TestHost;
        let _mockgoose: mockgoose.Mockgoose;

        before(async () => {
            _mockgoose = await initializeInMemoryMondoDb();
            testHost = createTestHost();
            testHost.express.use('/api', addUser({ tenants: [ { tenantId: '100' } ] }),
                createRoutes(ContentPageModel, logger));
            testHost.listen();
        });

        it('should be able to retrieve content pages', async () => {
            _mockgoose.helper.reset();

            const newContentPage =  new ContentPageModel({
                tenantId: '100',
                title: 'my title',
                url: '/',
                template: 'default',
            });

            await newContentPage.save();

            const response = await get('http://localhost:1234/api/100/contentpages');
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse(response.body).length).to.equal(1);
        });

        it('should be able to retrieve a single content page', async () => {
            _mockgoose.helper.reset();

            const newContentPage =  new ContentPageModel({
                tenantId: '100',
                title: new Date().getTime().toString(),
                url: '/',
                template: 'default',
            });

            await newContentPage.save();

            const response = await get(`http://localhost:1234/api/100/contentpages/${newContentPage._id}`);
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse(response.body).title).to.equal(newContentPage.title);
        });

        it('should be able to add a new content page', async () => {
            const payload = {
                title: 'some title',
                url: 'some url',
                template: 'default',
            };

            const response = await post('http://localhost:1234/api/100/contentpages', { json: true, body: payload });
            expect(response.statusCode).to.equal(200);
        });

        it('should be able to edit an existing content page', async () => {
            const payload = {
                title: 'some title',
                url: 'some url',
                template: 'default',
            };

            const response = await post('http://localhost:1234/api/100/contentpages', { json: true, body: payload });
            expect(response.statusCode).to.equal(200);
        });

        it('should be able to delete an existing content page', async () => {
            const newContentPage =  new ContentPageModel({
                tenantId: '100',
                title: 'my title',
                url: '/',
                template: 'default',
            });

            await newContentPage.save();

            const response = await del(`http://localhost:1234/api/100/contentpages/${newContentPage._id}`);
            expect(response.statusCode).to.equal(200);
        });

        after(async () => {
            await testHost.close();
            await _mockgoose.helper.mongoose.connection.close();
        });
    });
});
