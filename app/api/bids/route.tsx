// All API functionality for bids

import { NextResponse } from "next/server";
import db from "../../mock-data/database.json";
import * as Constants from '../common/constants';

// Sample data representing bids
let bids: Bid[] = db.bids;

export default interface Bid {
  id: string;
  collection_id: number;
  price: number;
  user_id: number;
  status: string;
}

export async function GET(request: any) {
  const collection_id = request.nextUrl.searchParams.get(Constants.COLLECTION_ID_KEY);
  if (!collection_id) {
    // Return list of bids
    return NextResponse.json({ bids: bids }, { status: 200 });
  }
  // Return list of bids for the specified collection_id
  const collectionBids = bids.filter(bid => bid.collection_id === parseInt(collection_id as string));
  return NextResponse.json({ collectionBids: collectionBids }, { status: 200 });
}

export async function POST(request: any) {
  const { collection_id, price, user_id, status } = request.nextUrl.searchParams;
  if (!collection_id || !price || !user_id || !status) {
    // If any of the required parameters is missing, return a 400 Bad Request response
    return NextResponse.json({ message: "Missing required parameters" }, { status: 400 });
  }
  // Create bid
  const newBid: Bid = { id: `${bids.length + 1}`, collection_id: parseInt(collection_id as string), price, user_id, status };
  bids.push(newBid);
  return NextResponse.json({ newBid: newBid }, { status: 201 });
}

export async function PUT(request: any) {
  const { collection_id, bid_id } = request.nextUrl.searchParams;
  if (!collection_id || !bid_id) {
    // If any of the required parameters is missing, return a 400 Bad Request response
    return NextResponse.json({ message: "Missing required parameters" }, { status: 400 });
  }
  // Accept bid (reject other bids)
  bids = bids.map(bid => {
    if (bid.collection_id === parseInt(collection_id as string)) {
      if (bid.id === bid_id) {
        bid.status = 'accepted';
      } else {
        bid.status = 'rejected';
      }
    }
    return bid;
  });
  return NextResponse.json({ message: "Bid accepted successfully" }, { status: 200 });
}

export async function DELETE(request: any) {
  // Delete bid
  const bid_id = request.nextUrl.searchParams.get(Constants.ID_KEY);
  if (!bid_id) {
    // If any of the required parameters is missing, return a 400 Bad Request response
    return NextResponse.json({ message: "Missing required parameters" }, { status: 400 });
  }
  bids = bids.filter(bid => bid.id !== bid_id);
  return NextResponse.json({ message: "Bid deleted successfully" }, { status: 200 });
}
