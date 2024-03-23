// Root page that fetches initial data and passes it to its children
'use client';

import React, { useState, useEffect } from 'react';
import CollectionsTable from './components/collectionsTable';
import * as Methods from './api/common/methods';
import Collection from './api/collections/route';
import Bid from './api/bids/route';

const MyComponent = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionsData = await Methods.callAPI('api/collections');
        const bidsData = await Methods.callAPI('api/bids');
        // Call APIs in parallel
        const [resolvedCollections, resolvedBids] = await Promise.all([collectionsData, bidsData]);
        setCollections(resolvedCollections.collections);
        setBids(resolvedBids.bids);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <CollectionsTable collections={collections} bids={bids} userId={0} />;
};

export default MyComponent;
