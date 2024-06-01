import React from 'react'
import styled from '@emotion/styled'
import Select from 'react-dropdown-select'

const Styled = ({ options, activeIndex, onChange }) => (
	<React.Fragment>
		<StyledSelect
			options={options}
			values={activeIndex !== -1 ? [options[activeIndex]] : []}
			color='white'
			placeholder='Select List...'
			dropdownGap={10}
			onChange={(value) => onChange(value)}
		/>
	</React.Fragment>
)

const StyledSelect = styled(Select)`
	width: 230px;
	font-size: 16px;
	background-color: orange;
	color: white;
	font-weight: 700;
	border: rgb(11, 102, 194);
	border-radius: 5px;
	padding: 9px 15px;

	.react-dropdown-select-input::placeholder {
		color: white;
		font-size: 16px;
		font-weight: 700;
	}

	.react-dropdown-select-option {
		border: 1px solid #fff;
	}

	.react-dropdown-select-item {
		color: #333;
		border-bottom: 1px solid lightgray;
		font-weight: 500;
	}

	.react-dropdown-select-dropdown-handle svg {
		height: 20px;
	}

	.react-dropdown-select-input {
		color: white;
	}

	.react-dropdown-select-dropdown {
		position: absolute;
		top: 50;
		left: 0;
		width: 230px;
		padding: 0;
		display: flex;
		flex-direction: column;
		border-radius: 2px;
		max-height: 300px;
		overflow: auto;
		z-index: 9;
		font-size: 16px;
		line-height: 30px;
		font-weight: 400;
		box-shadow: none;
		border-radius: 5px;
	}

	.react-dropdown-select-item {
		:hover {
			background-color: rgba(255, 166, 0, 0.6);
			color: white;
			font-weight: 800;
		}
	}

	.react-dropdown-select-item.react-dropdown-select-item-selected,
	.react-dropdown-select-item.react-dropdown-select-item-active {
		background-color: rgba(255, 166, 0, 1);
		color: #fff;
		display: none;
		font-weight: bold;
	}
`

export default Styled
