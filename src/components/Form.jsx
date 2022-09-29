import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import styles from './Form.module.scss';
import axios from 'axios';
import { textFieldHelper } from './TextField';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('This field is required'),
  price: Yup.string().required('This field is required'),
  imageUrl: Yup.string().required('This field is required'),
});
function Form({ onCloseForm }) {
  const formik = useFormik({
    initialValues: {
      title: '',
      price: '',
      imageUrl: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onCloseForm();
      axios.post('https://6327175fba4a9c47533089b9.mockapi.io/items/', values);
    },
  });
  

  

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className={styles.form}
      >
{/*         
         <TextField
          helperText={
            (formik.touched.title && formik.errors.title) || 'required'
          }
          id="title"
          name="title"
          label="Title"
          margin="normal"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
        />
          */}
      

        {textFieldHelper.map((obj) => {
          return(
          <TextField
            helperText={(formik.touched[obj.name] && formik.errors[obj.name]) || 'required'}
            id={obj.id}
            name={obj.name}
            label={obj.label}
            value={formik.values[obj.name]}
            onChange={formik.handleChange}
            error={formik.touched[obj.name] && Boolean(formik.errors[obj.name])}
          />)
        })}

        <Button
          className={styles.sneakers}
          type="submit"
          variant="contained"
        >
          Добавить
        </Button>
      </form>
    </div>
  );
}
export default Form;
