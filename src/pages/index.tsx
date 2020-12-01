import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import NavBar from "../components/navBar"
import {
  Container,
  ListGroup,
  Card,
  Jumbotron,
  Spinner,
  Button,
} from "react-bootstrap"
import { PencilSquare, TrashFill } from "react-bootstrap-icons"
import CreateOverlayMenu from "../components/createOverlayMenu"
import UpdateOverlayMenu from "../components/updateOverlayMenu"
const styles = require("./index.module.css")

interface data {
  name: string
  number: number
}

interface contactData {
  ref: Object
  data: data
  ts: number
}

export default function Home() {
  const [contactData, setContactData] = useState<null | contactData[]>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [dataFetchTrigger, setDataFetchTrigger] = useState(false)
  const [updateContact, setUpdateContact] = useState<contactData>()
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  useEffect(() => {
    fetch(`/.netlify/functions/readContacts`, {
      // method: 'post',
      // body: JSON.stringify({name:"a", number: 124})
    })
      .then(response => response.json())
      .then(data => {
        setContactData(data.data)
      })
      .catch(e => {
        alert("could not load the data, please refresh the page")
      })
  }, [dataFetchTrigger])

  function deleteButtonHandler(contact: contactData) {
    fetch(`/.netlify/functions/delete`, {
      method: "post",
      body: JSON.stringify({ id: contact.ref["@ref"].id }),
    })
      .then(response => response.json())
      .then(data => {
        setDataFetchTrigger(val => !val)
      })
      .catch(e => {
        alert("Could not delete the contact")
      })
  }

  function updateButtonHandler(contact: contactData) {
    setUpdateContact(contact)
    setShowUpdateModal(true)
  }

  return (
    <div>
      <NavBar />
      <Container fluid>
        <Jumbotron className={styles.jumbotron}>
          <Button
            className={styles.createButton}
            variant="primary"
            onClick={() => {
              setShowCreateModal(true)
            }}
          >
            Create Contact
          </Button>

          <Card className={styles.card}>
            <ListGroup variant="flush">
              {contactData !== null ? (
                contactData.length === 0 ? (
                  <div className={styles.noData}>
                    You have no contacts stored...
                  </div>
                ) : (
                  contactData.map((contact, ind) => {
                    return (
                      <ListGroup.Item key={ind}>
                        <div className={styles.container1}>
                          <div className={styles.textContainer}>
                            <h3>{contact.data.name}</h3>
                            <p>{contact.data.number}</p>
                          </div>

                          <div className={styles.iconsContainer}>
                            <PencilSquare
                              className={styles.icons}
                              onClick={() => {
                                updateButtonHandler(contact)
                              }}
                            />

                            <TrashFill
                              className={styles.icons}
                              onClick={() => {
                                deleteButtonHandler(contact)
                              }}
                            />
                          </div>
                        </div>
                      </ListGroup.Item>
                    )
                  })
                )
              ) : (
                <div className={styles.spinner}>
                  <Spinner animation="border" />
                </div>
              )}
            </ListGroup>
          </Card>
        </Jumbotron>
      </Container>

      <CreateOverlayMenu
        showModal={showCreateModal}
        setShowModal={setShowCreateModal}
        setDataFetchTrigger={setDataFetchTrigger}
      />
      <UpdateOverlayMenu
        showModal={showUpdateModal}
        setShowModal={setShowUpdateModal}
        setDataFetchTrigger={setDataFetchTrigger}
        updateContact={updateContact}
      />
    </div>
  )
}

/*

                */
