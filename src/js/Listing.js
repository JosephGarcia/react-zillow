import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import '../App.css';

class Listing extends Component {
	render() {
		const {
			picture,
			city,
			address,
			bedrooms,
			bathrooms,
			price,
			index
		} = this.props.listing;

		const { listing, activeListing, setActiveListing } = this.props;
		return (
			<div
				id={`listing-${index}`}
				className={`listing ${
					listing === activeListing ? 'listing__active' : ''
				}`}
				onClick={() => setActiveListing(listing)}
			>
				<img
					src={picture}
					alt={`House located in ${address}`}
					className="listing__picture"
				/>
				<div>
					<p>{city}, Australia</p>
				</div>
				<div>
					<p>
						{bedrooms} <i className="fas fa-bed" /> &#8226;{' '}
						{bathrooms} <i className="fas fa-bath" />
					</p>
				</div>
				<div>
					<p>{address}</p>
				</div>
				<div>
					<p>
						<NumberFormat
							value={price}
							displayType={'text'}
							thousandSeparator={true}
							prefix={'$'}
						/>
					</p>
				</div>
			</div>
		);
	}
}

export default Listing;
