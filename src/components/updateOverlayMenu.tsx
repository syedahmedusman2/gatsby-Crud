// import React, { Dispatch, SetStateAction, useState, useEffect } from "react"
// import { Modal, Button, Form } from "react-bootstrap"

// interface props {
//   showModal: Boolean
//   setShowModal: Dispatch<SetStateAction<boolean>>
//   setDataFetchTrigger: Dispatch<SetStateAction<boolean>>
//   updateContact: contactData
// }

// interface contactData {
//   ref: Object
//   data: data
//   ts: number
// }

// interface data {
//   name: string
//   number: number
// }

// export default function UpdateOverlayMenu(props: props) {
//   const [name, setName] = useState<string>("")
//   const [number, setNumber] = useState<string>("")

//   useEffect(() => {
//     if (props.updateContact) {
//       setName(props.updateContact.data.name)

//       setNumber(props.updateContact.data.number.toString())
//     }
//   }, [props.updateContact])

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

//     fetch(`/.netlify/functions/update`, {
//       method: "post",
//       body: JSON.stringify({
//         name: nameInput,
//         number: numberInput,
//         id: props.updateContact.ref["@ref"].id,
//       }),
//     })
//       .then(response => response.json())
//       .then(data => {
//         props.setShowModal(false)
//         props.setDataFetchTrigger(val => !val)
//       })
//       .catch(e => {
//         alert("could not update the contact")
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
//           <Modal.Title>Update Contact</Modal.Title>
//         </Modal.Header>
//         <Form onSubmit={handleSubmit}>
//           <Modal.Body>
//             <Form.Group controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 value={name}
//                 onChange={e => {
//                   setName(e.target.value)
//                 }}
//                 type="text"
//               />
//             </Form.Group>

//             <Form.Group controlId="formNumber">
//               <Form.Label>Number</Form.Label>
//               <Form.Control
//                 value={number}
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
//               Update
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </div>
//   )
// }