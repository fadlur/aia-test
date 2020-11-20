import { Editor } from '@tinymce/tinymce-react';
const EditorDeskripsi = (props) => {
  const handleChange = (e) => {
    // props.getEditorData(e.target.getContent());
    // console.log(e);
    props.getEditorData(e);
  }
  return (
    // console.log(process.env.EDITOR_KEY)
    <Editor
      apiKey="h5a87vi3mlkyx1iqnlfuzlly4xzbv4ziz3f7bvqeq435t464"
      initialValue={props.initialValues}
      value={props.initialValues}
      init={{
        height: 500,
        menubar: false,
        force_br_newlines : true,
        force_p_newlines : true,
        // forced_root_block : '',
        plugins: [
          'advlist autolink lists link image', 
          'charmap print preview anchor help',
          'searchreplace visualblocks code codesample',
          'insertdatetime media table paste wordcount',
        ],
        toolbar:
          'undo redo | formatselect | bold italic | \
          alignleft aligncenter alignright | \
          bullist numlist outdent indent | image media | codesample link code'
      }}
      onEditorChange={handleChange}
    />
  )
}

export default EditorDeskripsi;