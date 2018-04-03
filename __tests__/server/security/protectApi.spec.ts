import { expect } from 'chai';
import * as express from 'express';
import 'mocha';
import { authenticatedApi, tenantAuthorize } from '../../../server/security/protectApi';
import { get } from '../utils/httpClient';
import { addUser } from '../utils/mockedExpressMiddleware';
import createTestHost, { TestHost } from '../utils/testHost';

const createTenantUser = (id: string) => {
    return {
        tenants: [ { tenantId: id, sites: [] } ],
    };
};

describe('protectApi tests', () => {
    let testHost: TestHost;

    describe('authenticate tests', () => {
        before(() => {
            testHost = createTestHost();
            testHost.express.use('/notauthenticated', authenticatedApi,
                (req: express.Request, res: express.Response) => res.sendStatus(200));
            testHost.express.use('/authenticated', addUser(),
                (req: express.Request, res: express.Response) => res.sendStatus(200));
            testHost.listen();
        });

        it('should return 401 when not authenticated', async () => {
            const response = await get('http://localhost:1234/notauthenticated');
            expect(response.statusCode).to.equal(401);
        });

        it('should return 200 when authenticated', async () => {
            const response = await get('http://localhost:1234/authenticated');
            expect(response.statusCode).to.equal(200);
        });

        after((done) => {
            testHost.close(done);
        });
    });

    describe('tenant authorize tests', () => {
        before(() => {
            testHost = createTestHost();
            testHost.express.use('/:tenantId/notauthorized', addUser(createTenantUser('100')), tenantAuthorize,
                (req: express.Request, res: express.Response) => res.sendStatus(200));
            testHost.express.use('/:tenantId/authorized', addUser(createTenantUser('101')), tenantAuthorize,
                (req: express.Request, res: express.Response) => res.sendStatus(200));
            testHost.listen();
        });

        it('should return 403 when a tenant is not authorized', async () => {
            const response = await get('http://localhost:1234/101/notauthorized');
            expect(response.statusCode).to.equal(403);
        });

        it('should return 200 when a tenant is authorized', async () => {
            const response = await get('http://localhost:1234/101/authorized');
            expect(response.statusCode).to.equal(200);
        });

        after((done) => {
            testHost.close(done);
        });
    });
});
