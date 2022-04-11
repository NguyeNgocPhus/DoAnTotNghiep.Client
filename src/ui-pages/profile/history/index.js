import { Editor } from "@tinymce/tinymce-react"





export const HistoryProfile = () =>{
    return (
        <Editor 
            id={Math.random() + ''}
            textareaName='textareaName'
            init={{
                
                language_url: '/js/vi.js',
                language: 'vi',
                placeholder: "Mô tả yêu cầu công việc và kết quả đầu ra mong muốn",
                plugins: [
                    "advlist autolink lists link image charmap print preview hr anchor",
                    "searchreplace wordcount visualblocks visualchars code fullscreen",
                    "insertdatetime nonbreaking save table contextmenu directionality help",
                    "emoticons paste textcolor colorpicker textpattern"
                ],
                toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview | forecolor backcolor emoticons | help",
                file_browser_callback_types: 'file image',
                automatic_uploads: true,
                paste_data_images: true,
                // images_upload_handler: uploadFileOfTinyMCE,
                file_picker_types: 'file image',
                importcss_append: true,

            }}
        ></Editor>
    )
}