import React, { Component } from 'react';
import Listing from './Listing';
import GoogleMap from './GoogleMap';
import ListingHeader from './ListingHeader';
import '../Listing.css';
import data from './data';
import jump from 'jump.js';
import { easeInOutCubic } from './utils/Easing';

class ListingsController extends Component {
	state = {
		listings: data.listings,
		activeListing: data.listings[0],
		filterBedrooms: 'any',
		filterSort: 'any',
		filteredListings: [],
		priceFrom: 0,
		priceTo: 1000001,
		isFiltering: false
	};

	resetFilter = (e, form) => {
		e.preventDefault();

		this.setState({
			listings: this.state.listings.sort((a, b) => a.index - b.index),
			filterBedrooms: 'any',
			filterSort: 'any',
			priceFrom: 0,
			priceTo: 1000001,
			filterListings: [],
			isFiltering: false,
			activeListing: this.state.listings[0]
		});

		form.reset();
	};

	handleFilterChange = e => {
		const target = e.target;
		const { name, value } = target;
		this.setState(
			{
				[name]: value
			},
			function() {
				this.filterListings();
			}
		);
	};

	filterListings = () => {
		const {
			listings,
			filterBedrooms,
			filterSort,
			priceFrom,
			priceTo
		} = this.state;
		const isFiltering =
			filterBedrooms !== 'any' ||
			filterSort !== 'any' ||
			priceFrom !== 0 ||
			priceTo !== 1000001;

		const getFilteredListings = listings => {
			const filteredListings = [];

			listings.map(listing => {
				const { bedrooms, price } = listing;
				const match =
					(bedrooms === parseInt(filterBedrooms, 10) ||
						filterBedrooms === 'any') &&
					(price >= priceFrom && price <= priceTo);

				match && filteredListings.push(listing);
			});

			switch (filterSort) {
				case '0':
					filteredListings.sort((a, b) => a.price - b.price);
					break;
				case '1':
					filteredListings.sort((a, b) => b.price - a.price);
					break;
				default:
			}

			return filteredListings;
		};

		this.setState({
			filteredListings: getFilteredListings(listings),
			activeListing: getFilteredListings(listings)[0] || listings[0],
			isFiltering
		});
	};

	setActiveListing = listing => {
		const { index } = listing;

		this.setState({
			activeListing: listing
		});

		const target = `#listing-${index}`;
		// console.log(target);
		jump(target, {
			container: '.listings__view',
			duration: 800,
			easing: easeInOutCubic
		});
	};

	render() {
		const {
			listings,
			activeListing,
			filteredListings,
			isFiltering
		} = this.state;
		const currentListings = isFiltering ? filteredListings : listings;

		return (
			<div className="listings">
				<GoogleMap
					listings={listings}
					activeListing={activeListing}
					setActiveListing={this.setActiveListing}
					filteredListings={filteredListings}
					isFiltering={isFiltering}
				/>
				<div className="listings__view">
					<ListingHeader
						handleFilterChange={this.handleFilterChange}
						resetFilter={this.resetFilter}
						currentMinPrice={this.state.priceFrom}
					/>
					{currentListings.map(listing => {
						return (
							<Listing
								key={listing._id}
								listing={listing}
								activeListing={activeListing}
								setActiveListing={this.setActiveListing}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

export default ListingsController;
