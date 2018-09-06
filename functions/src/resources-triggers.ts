import * as functions from 'firebase-functions';

import { AlgoliaConfig } from './algolia.config';
import { Resource } from './models/resource';
import { ResourceSearchService } from './resource-search.service';

export async function onResourceCreateAsync(snap: FirebaseFirestore.DocumentSnapshot, context: functions.EventContext, algoliaConfig: AlgoliaConfig): Promise<void> {
    
    const resource = snap.data() as Resource;
    resource.id = snap.id;

    const resourceSearchService = new ResourceSearchService(algoliaConfig);

    await resourceSearchService.addAsync(resource)
};

export async function onResourceUpdateAsync(change: functions.Change<FirebaseFirestore.DocumentSnapshot>, context: functions.EventContext, algoliaConfig: AlgoliaConfig): Promise<void> {

    const resource = change.after.data() as Resource;
    resource.id = change.after.id;

    const resourceSearchService = new ResourceSearchService(algoliaConfig);

    await resourceSearchService.updateAsync(resource);
};

export async function onResourceDeleteAsync(snap: FirebaseFirestore.DocumentSnapshot, context: functions.EventContext, algoliaConfig: AlgoliaConfig): Promise<void> {
    
    const resourceSearchService = new ResourceSearchService(algoliaConfig);

    await resourceSearchService.deleteAsync(snap.id)
};
