import React, { Component } from 'react';
import { priceFormat } from './utils/Formatters';

class Filter extends Component {
    render() {
        const { handleFilterChange, resetFilter } = this.props;
        return (
            <form ref={input => (this.form = input)} className="filter">
                <div className="filterBox">
                    <label htmlFor="filterBedrooms">Bedrooms</label>
                    <select
                        name="filterBedrooms"
                        id="filterBedrooms"
                        onChange={e => {
                            handleFilterChange(e);
                        }}
                    >
                        <option value="any">Any</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div className="filterBox">
                    <label htmlFor="priceFrom">Min Price</label>
                    <select
                        id="priceFrom"
                        name="priceFrom"
                        onChange={e => {
                            handleFilterChange(e);
                        }}
                    >
                        <option value="0">Any</option>
                        <option value="500000">{priceFormat(500000)}</option>
                        <option value="600000">{priceFormat(600000)}</option>
                        <option value="700000">{priceFormat(700000)}</option>
                        <option value="800000">{priceFormat(800000)}</option>
                        <option value="900000">{priceFormat(900000)}</option>
                    </select>
                </div>
                <div className="filterBox">
                    <label htmlFor="priceTo">Max Price</label>
                    <select
                        id="priceTo"
                        name="priceTo"
                        onChange={e => {
                            handleFilterChange(e);
                        }}
                    >
                        <option value="1000001">Any</option>
                        <option value="600000">{priceFormat(600000)}</option>
                        <option value="700000">{priceFormat(700000)}</option>
                        <option value="800000">{priceFormat(800000)}</option>
                        <option value="900000">{priceFormat(900000)}</option>
                        <option value="1000000">{priceFormat(1000000)}</option>
                    </select>
                </div>
                <div className="filterBox">
                    <label htmlFor="filterSort">Order by</label>
                    <select
                        id="filterSort"
                        name="filterSort"
                        onChange={e => {
                            handleFilterChange(e);
                        }}
                    >
                        <option value="any">Default</option>
                        <option value="0">Price: - Low to High</option>
                        <option value="1">Price: - High to Low</option>
                    </select>
                </div>
                <div className="filterBox">
                    <label>&nbsp;</label>
                    <button
                        className="btn-clear"
                        onClick={e => resetFilter(e, this.form)}
                    >
                        Clear
                    </button>
                </div>
            </form>
        );
    }
}

export default Filter;