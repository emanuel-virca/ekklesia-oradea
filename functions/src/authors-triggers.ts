import * as functions from 'firebase-functions';

import { AlgoliaConfig } from './algolia.config';
import { ResourceSearchService } from './resource-search.service';
import { Author } from './models/author.model';

export async function onAuthorUpdateAsync(change: functions.Change<FirebaseFirestore.DocumentSnapshot>, context: functions.EventContext, algoliaConfig: AlgoliaConfig): Promise<void> {

    const author = change.after.data() as Author;
    author.id = change.after.id;

    const resourceSearchService = new ResourceSearchService(algoliaConfig);

    await resourceSearchService.updateByAuthorAsync(author);
};
