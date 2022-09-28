import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import styles from './Form.module.scss';
import { useState } from 'react';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('This field is required'),
  price: Yup.string().required('This field is required'),
  imageUrl: Yup.string().required('This field is required'),
});
function Form({ onCloseForm }) {
  //   const [addProduct, setAddProduct] = useState(false);

  //   const onClickAddProduct = async () => {
  // try {
  //   const respons= await axios.post(
  //     'https://6327175fba4a9c47533089b9.mockapi.io/items/',{
  //       title:'',
  //       price:'',
  //       imageUrl:''
  //     })
  //     alert(respons.data.messsage)
  // } catch (error) {
  //   alert('e')
  // }

  //     setAddProduct(true);
  //   };

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
        <TextField
          helperText={
            (formik.touched.price && formik.errors.price) || 'required'
          }
          id="price"
          name="price"
          label="price"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.touched.price && Boolean(formik.errors.price)}
        />
        <TextField
          helperText={
            (formik.touched.imageUrl && formik.errors.imageUrl) || 'required'
          }
          id="imageUrl"
          name="imageUrl"
          label="imageUrl"
          value={formik.values.imageUrl}
          onChange={formik.handleChange}
          error={formik.touched.price && Boolean(formik.errors.price)}
        />
        <Button
          // onClick={()=>onClickAddProduct()}
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
