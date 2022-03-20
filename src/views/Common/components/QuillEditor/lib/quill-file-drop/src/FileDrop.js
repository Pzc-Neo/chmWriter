/**
 * Custom module for quilljs to allow user to drag file from their file system into the editor
 * Auther: 潘志城_Neo
 */
export class FileDrop {
  constructor(quill, options) {
    this.quill = quill
    this.options = options
    this.quill.root.addEventListener(
      'drop',
      event => {
        this.handleDrop(event)
      },
      false
    )
  }

  /**
   * Handler for drop event to read dropped files from evt.dataTransfer
   * @param {Event} evt
   */
  handleDrop(evt) {
    if (
      evt.dataTransfer &&
      evt.dataTransfer.files &&
      evt.dataTransfer.files.length
    ) {
      this.readFiles(evt.dataTransfer.files, text => {
        this.insertAfter(text)
      })
    }
  }

  /**
   * Insert the file's content into the document at the current cursor position
   * @param {String} data  The file's content
   */
  insertAfter(data) {
    const { index } = this.quill.getSelection()
    this.quill.insertText(index, data)
  }

  /**
   * Read file content
   * @param {File[]} files  One or more File objects
   * @param {Function} callback  A function to send each content to
   */
  readFiles(files, callback) {
    Array.prototype.forEach.call(files, file => {
      if (
        !file.type.match(
          /^(text|application)\/(plain|doc|json|javascript|html|css)/i
        )
      ) {
        // file is not support
        return
      }
      // set up file reader
      const reader = new FileReader()
      reader.onload = evt => {
        callback(evt.target.result)
      }
      // read the clipboard item or file
      const blob = file.getAsFile ? file.getAsFile() : file
      if (blob instanceof Blob) {
        reader.readAsText(blob)
      }
    })
  }
}
