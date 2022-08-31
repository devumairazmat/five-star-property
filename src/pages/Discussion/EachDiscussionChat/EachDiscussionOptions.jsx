import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { MdEdit, MdOutlineReply, MdDelete } from 'react-icons/md'

const iconSize = 24

export default function EachDiscussionOptions({ onDeleteClick, onReply, editable, onEditClick }) {
	return (
		<Dropdown>
			<Dropdown.Toggle
				variant="success"
				style={{ background: 'none' }}
				id={String(Math.random())}
				className="border-0 btn-sm text-grey-700"
				// role={'figure'}
			>
				{/* <HiDotsVertical /> */}
			</Dropdown.Toggle>

			<Dropdown.Menu className="rounded-xxxl shadow p-0">
				{editable ? (
					<>
						<hr className="m-0" />
						<Dropdown.Item
							className="text-grey-700 fw-500 pb-3 pt-3"
							onClick={onEditClick}
						>
							<MdEdit size={iconSize} /> Edit
						</Dropdown.Item>
						<hr className="m-0" />
						<Dropdown.Item
							className="text-grey-700 fw-500 pb-3 pt-3"
							onClick={onDeleteClick}
						>
							<MdDelete size={iconSize} /> Delete
						</Dropdown.Item>
					</>
				) : (
					<Dropdown.Item
						className="text-grey-700 fw-500 pb-3 pt-3"
						onClick={onReply}
					>
						<MdOutlineReply size={iconSize} /> Reply
					</Dropdown.Item>
				)}
			</Dropdown.Menu>
		</Dropdown>
	)
}
