import React from 'react';
import Card from './Card';
import './Cards.css';

const Cards = ({ cards }) => {
	return cards.map((card, i) => <Card {...card} key={i} />);
};

export default React.memo(Cards);
