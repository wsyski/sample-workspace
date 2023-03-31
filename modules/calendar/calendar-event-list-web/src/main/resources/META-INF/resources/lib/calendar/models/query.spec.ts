import {Query, query2QueryParams, QueryParams, queryParams2Query} from './query';

describe('Query', () => {

    describe('query2QueryParams', () => {
        let query: Query;

        describe('empty query', () => {
            beforeEach(() => {
                query = {
                    q: '',
                    locations: ['location0', 'location1'],
                    tags: []
                };
            });

            it('expected removed query and tags', () => {
                expect(query2QueryParams(query)).toEqual(
                    {
                        location: ['location0', 'location1']
                    }
                );
            });
        });
    });
    describe('queryParams2Query', () => {
        let queryParams: QueryParams;

        describe('empty query', () => {
            beforeEach(() => {
                queryParams = {
                    q: '',
                    location: ['location0', 'location1', ''],
                    tag: []
                };
            });

            it('expected removed query and tag', () => {
                expect(queryParams2Query(queryParams)).toEqual(
                    {
                        locations: ['location0', 'location1']
                    }
                );
            });
        });
    });
});
