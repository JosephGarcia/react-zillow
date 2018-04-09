import React from 'react';
import image from '../img/house-location-pin.svg';
import Filter from './Filter';
import '../ListingHeader.css';

const ListingHeader = ({ handleFilterChange, resetFilter }) => (
	<div className="listing__header">
		<div>
			<img
				className="listing__header-img"
				src={image}
				alt="Header Menu"
			/>
			<h1>PROPERTY LISTINGS</h1>
		</div>

		<Filter
			handleFilterChange={handleFilterChange}
			resetFilter={resetFilter}
		/>
	</div>
);

export default ListingHeader;
