import * as React from "react"
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Grid, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Modal } from '@material-ui/core';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button } from '@material-ui/core';
import './../pages/index.module.css'
import './main.css';
const baseURL = ".netlify/functions/faunadb-crud/";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            textAlign: 'center',
        },
        parent: {
            textAlign: 'center'
        },
        dataDisplay: {
            backgroundColor: '#eeeeee',
            marginBottom: '10px'
        },
        textField: {
            width: '100%',
            textAlign: 'center',
        },
        input: {
            width: '100%',
            textAlign: 'center',
        },  
        

        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);
const schema = Yup.object({
    todo: Yup.string()
        .required('Add an item')
        .min(0, 'Must be greater than or equals to 1 characters')
});

export interface TodosProps {

}

const getAllTodos = async () => {
    return await fetch(baseURL)
        .then(res => res.json())
        .then(data => {
            return data;
        });
}

const addTodo = async (title) => {
    var result = await fetch(baseURL, {
        method: 'POST',
        body: JSON.stringify({ title })
    });
    console.log(result);
    

    return result;
}


const deleteTodo = async (id) => {
    return await fetch(`${baseURL}/${id}`, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(data => {
           
            return data;
        })
        .catch(err => console.log(err))
}

const updateTodo = async (id, title) => {
    return await fetch(`${baseURL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title })
    })
        .then(res => res.json())
        .then(data => {
            
            return data;
        })
        .catch(err => console.log(err))
}



const Todos: React.SFC<TodosProps> = () => {

    const classes = useStyles();
    const [todo, setTodo] = React.useState('')
    const [todos, setTodos] = React.useState([])
    const [fetchData, setFetchData] = React.useState(false)
    const [currentId, setCurrentId] = React.useState(null);
    const [isUpdate, setIsUpdate] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    // const [modalStyle] = React.useState(getModalStyle);
    const [currentTitle,setCurrentTitle]=React.useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    React.useEffect(() => {
        ; (async () => {
            var data = await getAllTodos();
            console.log("data", data);
            setTodos(data);
            setFetchData(false);
        })()
    }, [fetchData])



    return (
        <div className={classes.parent}>
            <div>
                <Formik
                    initialValues={{ todo: todo }}
                    validationSchema={schema}
                    onSubmit={(value, { resetForm }) => {
                        console.log('todo', value.todo)
                        setTodo('')
                        addTodo(value.todo);
                        resetForm();
                        setFetchData(true);
                        setIsUpdate(false);
                        setCurrentId(null);
                        
                    }}

                >
                    {(formik: any) => (
                        <Form onSubmit={formik.handleSubmit}>
                            <Grid container justify="center">
                                <Grid item xs={12} sm={4}>
                                    <div>
                                        <Field
                                            type='todo'
                                            as={TextField}
                                            variant="outlined"
                                            label="Add Item"
                                            name="todo"
                                            id="todo"
                                            className='input'
                                        />
                                        <br />
                                        <ErrorMessage name='todo' render={(msg: string) => (
                                            <span style={{ color: "red", fontSize: '18sp' }}>{msg}</span>
                                        )} />
                                        <br />
                                    </div>

                                    <div>
                                        <Button variant="contained" color="primary" type="submit" className='button' >
                                            SUBMIT
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </Form>
                    )}

                </Formik>
            </div>

            <Grid container justify="center">
                <Grid item xs={12} sm={4}>
                    {
                        <List>
                            {todos.map(todo => (
                                <ListItem key={todo.ref['@ref'].id} className={classes.dataDisplay}>
                                    <ListItemText
                                        primary={todo.data.title}
                                    />
                                    <ListItemSecondaryAction>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="simple-modal-title"
                                            aria-describedby="simple-modal-description"
                                        >
                                            <div style={{backgroundColor:'black'}} className={classes.paper}>
                                                <Formik
                                                    initialValues={{ todo: currentTitle }}
                                                    validationSchema={schema}
                                                    onSubmit={(value, { resetForm }) => {
                                                        console.log('todo', value.todo)
                                                        updateTodo(currentId, value.todo)
                                                        resetForm();
                                                        setFetchData(true);
                                                        setIsUpdate(false);
                                                        setCurrentId(null);
                                                        setCurrentTitle('');
                                                        handleClose();
                                                    }}

                                                >
                                                    {(formik: any) => (
                                                        <Form onSubmit={formik.handleSubmit}>
                                                            <Grid container justify="center">
                                                                <Grid item xs={12}>
                                                                    <div>
                                                                        <Field
                                                                            type='todo'
                                                                            as={TextField}
                                                                            variant="outlined"
                                                                            label="Todo"
                                                                            name="todo"
                                                                            id="todo"
                                                                            className={classes.textField}
                                                                        />
                                                                        <br />
                                                                        <ErrorMessage name='todo' render={(msg: string) => (
                                                                            <span style={{ color: "red", fontSize: '18sp' }}>{msg}</span>
                                                                        )} />
                                                                        <br />
                                                                    </div>

                                                                    <div>
                                                                        <Button variant="contained" color="primary" type="submit" className={classes.textField}>
                                                                            Update Item
                                                                         </Button>
                                                                    </div>
                                                                </Grid>
                                                            </Grid>
                                                        </Form>
                                                    )}

                                                </Formik>

                                            </div>

                                        </Modal>
                                        <IconButton edge="end" aria-label="delete" onClick={() => {
                                            console.log('Update Button', todo.ref['@ref'].id);
                                            setTodo(todo.data.title);
                                            setCurrentId(todo.ref['@ref'].id)
                                            setCurrentTitle(todo.data.title)
                                            setIsUpdate(true);
                                            setOpen(true)
                                        }}>
                                            <CreateOutlinedIcon />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete" onClick={async () => {
                                            console.log('Delete Button', todo.ref['@ref'].id);
                                            var result = await deleteTodo(todo.ref['@ref'].id);
                                            console.log("result", result);
                                            setFetchData(true);
                                        }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>))}
                        </List>
                    }
                </Grid>
            </Grid>
        </div >
    )
}

export default Todos;