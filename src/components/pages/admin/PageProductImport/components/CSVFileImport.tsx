import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import axios from 'axios';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3, 0, 3),
  },
}));

type CSVFileImportProps = {
  url: string,
  title: string
};

export default function CSVFileImport({url, title}: CSVFileImportProps) {
  const classes = useStyles();
  const [file, setFile] = useState<any>();

  const onFileChange = (e: any) => {
    console.log(e);
    let files = e.target.files || e.dataTransfer.files
    if (!files.length) return
    setFile(files.item(0));
  };

  const removeFile = () => {
    setFile('');
  };

  const uploadFile = async (e: any) => {
      try {
        // Get the presigned URL
        const response = await axios({
          method: 'GET',
          url,
          params: {
            name: encodeURIComponent(file.name)
          }
        })
        console.log('File to upload: ', file)
        console.log('Uploading to dasdd: ', response.data)
        const result = await fetch(response.data, {
          method: 'PUT',
          headers: {
            'Content-Type': 'text/csv',
          },
          body: file
        })
        console.log('Result: ', result)
        setFile('');
        toast.success('Файл успешно загружен');
      } catch (err) {
        toast.error(err.message);
      }
    }
  ;

  return (
    <div className={classes.content}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
          <input type="file" accept=".csv"  onChange={onFileChange}/>
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </div>
  );
}
