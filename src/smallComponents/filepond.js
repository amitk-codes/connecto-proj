import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType)

export function FileInput(files, handlePic, name, label) {
  return (
    <FilePond
      acceptedFileTypes={["image/png", "image/jpeg", "image/jpg"]}
      labelFileTypeNotAllowed="Invalid File Type"
      fileValidateTypeLabelExpectedTypes="Only Images Allowed"
      files={files}
      onupdatefiles={handlePic}
      maxFiles={1}
      name={name}
      credits={null}

      labelIdle={`Change ${label} Photo: <span class="filepond--label-action">Browse</span>`}

    />

  )
}