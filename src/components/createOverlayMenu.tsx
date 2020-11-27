// import React, { Dispatch, SetStateAction, useState } from "react"
// import { Modal, Button, Form } from "react-bootstrap"

// interface props {
//   showModal: Boolean
//   setShowModal: Dispatch<SetStateAction<boolean>>
//   setDataFetchTrigger: Dispatch<SetStateAction<boolean>>
// }

// export default function CreateOverlayMenu(props: props) {
//   const [name, setName] = useState<null | string>(null)
//   const [number, setNumber] = useState<null | string>(null)

//   const handleClose = () => props.setShowModal(false)

//   const handleSubmit = e => {
//     e.preventDefault()

//     let nameInput = name
//     let numberInput = number

//     if (
//       nameInput === null ||
//       nameInput === undefined ||
//       nameInput.length === 0
//     ) {
//       nameInput = "Unnamed Contact"
//     }

//     if (
//       numberInput === null ||
//       numberInput === undefined ||
//       numberInput.length === 0
//     ) {
//       numberInput = "-"
//     }

//     fetch(`/.netlify/functions/create`, {
//       method: "post",
//       body: JSON.stringify({ name: nameInput, number: numberInput }),
//     })
//       .then(response => response.json())
//       .then(data => {
//         props.setShowModal(false)
//         props.setDataFetchTrigger(val => !val)
//       })
//       .catch(e => {
//         alert("could not create a new contact")
//         props.setShowModal(false)
//       })
//   }

//   return (
//     <div>
//       <Modal
//         show={props.showModal}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Create Contact</Modal.Title>
//         </Modal.Header>
//         <Form onSubmit={handleSubmit}>
//           <Modal.Body>
//             <Form.Group controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 onChange={e => {
//                   setName(e.target.value)
//                 }}
//                 type="text"
//               />
//             </Form.Group>

//             <Form.Group controlId="formNumber">
//               <Form.Label>Number</Form.Label>
//               <Form.Control
//                 onChange={e => {
//                   setNumber(e.target.value)
//                 }}
//                 type="number"
//               />
//             </Form.Group>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//               Close
//             </Button>
//             <Button variant="primary" type="submit">
//               Create
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </div>
//   )
// }