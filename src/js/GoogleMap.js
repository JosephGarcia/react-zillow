/* global google */
import React, { Component } from 'react';

class GoogleMap extends Component {
	state = {
		markers: []
	};

	componentWillReceiveProps(nextProps) {
		const { activeListing, filteredListings } = nextProps;
		const { index } = activeListing;

		this.hideAllWindows();

		filteredListings.length !== 0 && this.showInfoWindow(index);
	}

	hideAllWindows = () => {
		const { markers } = this.state;
		markers.forEach(marker => {
			marker.iw.close();
		});
	};

	showInfoWindow = index => {
		const { markers } = this.state;
		markers[index] && markers[index].iw.open(this.map, markers[index]);
	};

	componentDidUpdate() {
		const { filteredListings, isFiltering } = this.props;
		const { markers } = this.state;

		markers.forEach(marker => {
			const { listing } = marker;

			if (isFiltering) {
				if (filteredListings.includes(listing)) {
					markers[listing.index].setVisible(true);
				} else {
					markers[listing.index].setVisible(false);
				}
			} else {
				markers[listing.index].setVisible(true);
			}
		});
	}

	componentDidMount() {
		const { activeListing, listings } = this.props;
		const { longitude, latitude } = activeListing;

		this.map = new google.maps.Map(this.refs.map, {
			center: { lat: latitude + 0.004, lng: longitude - 0.003 },
			mapTypeControl: false,
			zoom: 14.5
		});

		this.createMarkers(listings);
	}

	createMarkers = listings => {
		const { setActiveListing, activeListing } = this.props;
		const { markers } = this.state;
		listings.forEach(listing => {
			const { longitude, latitude, index, address } = listing;

			this.marker = new google.maps.Marker({
				position: { lat: latitude, lng: longitude },
				map: this.map,
				label: {
					color: '#FFFFFF',
					text: `${index + 1}`
				},
				listing
			});

			const iw = new google.maps.InfoWindow({
				content: `<h3>${address}</h3>`
			});

			this.marker.iw = iw;

			this.marker.addListener(
				'click',
				function() {
					this.hideAllWindows();
					setActiveListing(listing);
				}.bind(this)
			);
			markers.push(this.marker);
			this.showInfoWindow(activeListing);
		});
	};

	render() {
		return <div className="map" ref="map" />;
	}
}

export default GoogleMap;
