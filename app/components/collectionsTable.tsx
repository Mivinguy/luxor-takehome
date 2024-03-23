'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp, Edit, Delete, Add } from '@mui/icons-material';
import Collection from '../api/collections/route';
import Bid from '../api/bids/route';

interface CollectionsTableProps {
  collections: Collection[];
  bids: Bid[];
  userId: number;
}

const CollectionsTable: React.FC<CollectionsTableProps> = ({ collections, bids, userId }) => {
  const [openRows, setOpenRows] = useState<number[]>([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState({});
  const [collectionName, setCollectionName] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  const [collectionStocks, setCollectionStocks] = useState<number>(NaN);
  const [collectionPrice, setCollectionPrice] = useState<number>(NaN);

  const handleRowClick = (id: number) => {
    setOpenRows((prevOpenRows) => {
      if (prevOpenRows.includes(id)) {
        return prevOpenRows.filter((rowId) => rowId !== id);
      } else {
        return [...prevOpenRows, id];
      }
    });
  };

  const handleEditClick = (collection: Collection) => {
    setSelectedCollection(collection);
    setCollectionName(collection.name);
    setCollectionDescription(collection.descriptions);
    setCollectionStocks(collection.stocks);
    setCollectionPrice(collection.price);
    setOpenEditDialog(true);
  };

  const handleDeleteClick = (collection: Collection) => {
    // Handle delete functionality by hitting the corresponding API
  };

  const handleAcceptBidClick = (bid: Bid) => {
    // Handle accept bid functionality by hitting the corresponding API
  };

  const handleRejectBidClick = (bid: Bid) => {
    // Handle reject bid functionality by hitting the corresponding API
  };

  const handleAddBidClick = () => {
    // Handle add bid functionality by hitting the corresponding API
  };

  const handleCancelEdit = () => {
    setOpenEditDialog(false);
  };

  const handleSaveEdit = () => {
    setOpenEditDialog(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Stocks</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {collections.map((collection) => (
              <React.Fragment key={collection.id}>
                <TableRow onClick={() => handleRowClick(collection.id)}>
                  <TableCell>
                    <IconButton>
                      {openRows.includes(collection.id) ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                  </TableCell>
                  <TableCell>{collection.name}</TableCell>
                  <TableCell>{collection.descriptions}</TableCell>
                  <TableCell>{collection.stocks}</TableCell>
                  <TableCell>{collection.price}</TableCell>
                  <TableCell>
                    {collection.id === userId ? (
                      <>
                        <IconButton onClick={() => handleEditClick(collection)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteClick(collection)}>
                          <Delete />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton onClick={() => handleAddBidClick()}>
                        <Add />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={openRows.includes(collection.id)} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Table size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <TableCell>Bid ID</TableCell>
                              <TableCell>Price</TableCell>
                              <TableCell>User ID</TableCell>
                              <TableCell>Status</TableCell>
                              <TableCell>Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {bids
                              .filter((bid) => bid.collection_id === collection.id)
                              .map((bid) => (
                                <TableRow key={bid.id}>
                                  <TableCell>{bid.id}</TableCell>
                                  <TableCell>{bid.price}</TableCell>
                                  <TableCell>{bid.user_id}</TableCell>
                                  <TableCell>{bid.status}</TableCell>
                                  <TableCell>
                                    {collection.id === userId ? (
                                      <>
                                        <IconButton onClick={() => handleAcceptBidClick(bid)}>
                                          Accept
                                        </IconButton>
                                        <IconButton onClick={() => handleRejectBidClick(bid)}>
                                          Reject
                                        </IconButton>
                                      </>
                                    ) : bid.user_id === userId ? (
                                      <>
                                        <IconButton onClick={() => handleEditClick(collection)}>
                                          <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteClick(collection)}>
                                          <Delete />
                                        </IconButton>
                                      </>
                                    ) : (null)}
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openEditDialog} onClose={handleCancelEdit}>
        <DialogTitle>Edit Collection</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="standard"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            variant="standard"
            value={collectionDescription}
            onChange={(e) => setCollectionDescription(e.target.value)}
            fullWidth
          />
          <TextField
            label="Stocks"
            variant="standard"
            value={collectionStocks}
            onChange={(e) => setCollectionStocks(parseInt(e.target.value))}
            fullWidth
          />
          <TextField
            label="Price"
            variant="standard"
            value={collectionPrice}
            onChange={(e) => setCollectionPrice(parseInt(e.target.value))}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CollectionsTable;
