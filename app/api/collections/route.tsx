// All API functionality for collections

import { NextResponse } from "next/server";
import db from "../../mock-data/database.json";
import * as Constants from '../common/constants';

// Sample data representing collections
let collections: Collection[] = db.collections;

export default interface Collection {
  id: number;
  name: string;
  descriptions: string;
  stocks: number;
  price: number;
}

export async function GET(request: any) {
  const collection_id = request.nextUrl.searchParams.get(Constants.COLLECTION_ID_KEY);
  if (!collection_id) {
    // Return list of collections
    return NextResponse.json({ collections: collections }, { status: 200 });
  } else {
    // Return specific collection by id
    const collection = collections.find(collection => collection.id === parseInt(collection_id as string));
    if (collection) {
      return NextResponse.json({ collections: collections }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Collection not found" }, { status: 404 });
    }
  }
}

export async function POST(request: any) {
  // Create collection
  const { name, descriptions, stocks, price } = request.nextUrl.searchParams;
  if (!name || !descriptions || !stocks || !price) {
    // If any of the required parameters is missing, return a 400 Bad Request response
    return NextResponse.json({ message: "Missing required parameters" }, { status: 400 });
  }
  const newCollection: Collection = { id: collections.length + 1, name, descriptions, stocks, price };
  collections.push(newCollection);
  return NextResponse.json({ newCollection: newCollection }, { status: 201 });
}

export async function PUT(request: any) {
  // Update collection
  const { id, updatedName, updatedDescriptions, updatedStocks, updatedPrice } = request.nextUrl.searchParams;
  if (!id || !updatedName || !updatedDescriptions || !updatedStocks || !updatedPrice) {
    // If any of the required parameters is missing, return a 400 Bad Request response
    return NextResponse.json({ message: "Missing required parameters" }, { status: 400 });
  }
  const index = collections.findIndex(collection => collection.id === parseInt(id as string));
  if (index !== -1) {
    collections[index] = {
      ...collections[index],
      name: updatedName,
      descriptions: updatedDescriptions,
      stocks: updatedStocks,
      price: updatedPrice
    };
    return NextResponse.json({ newCollection: collections[index] }, { status: 200 });
  } else {
    return NextResponse.json({ message: "Collection not found" }, { status: 404 });
  }
}

export async function DELETE(request: any) {
  // Delete collection
  const collection_id = request.nextUrl.searchParams.get(Constants.COLLECTION_ID_KEY);
  if (!collection_id) {
    // If any of the required parameters is missing, return a 400 Bad Request response
    return NextResponse.json({ message: "Missing required parameters" }, { status: 400 });
  }
  collections = collections.filter(collection => collection.id !== parseInt(collection_id as string));
  return NextResponse.json({ message: "Collection deleted successfully" }, { status: 200 });
}
