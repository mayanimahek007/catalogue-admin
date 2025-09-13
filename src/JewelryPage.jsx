import React from 'react';
import JewelryTable from './components/JewelryTable';

export default function JewelryPage(){
  return (
    <div style={{padding:20, fontFamily:'Arial, sans-serif'}}>
      <h1>Jewelry List</h1>
  <JewelryTable showDelete={true} />
    </div>
  );
}
