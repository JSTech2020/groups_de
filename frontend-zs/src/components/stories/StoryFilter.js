import React, { useState } from 'react'
import { Form, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import './Story.scss'

function CategoryButton(category) {
    return (
        <ToggleButton value={category} className="btn-category mr-2" >
            <strong>
                {category}
            </strong>
        </ToggleButton>)
}

export default function StoryFilter(onSearch, categories, onCategory) {
    const [selected, setSelected] = useState([]);

    const handleChange = (selected) => {
        setSelected(selected)
        onCategory(selected)
    };

    return (
        <div>
            <Form.Control
                className="mb-3"
                type="text"
                placeholder="Suche nach Titel"
                onChange={(evt) => onSearch(evt.target.value)} />
            <ToggleButtonGroup type="checkbox" value={selected} onChange={handleChange} className=" mb-3" >
                {categories.map((category) => {
                    return CategoryButton(category)
                })}
            </ToggleButtonGroup >
        </div>
    );
}
