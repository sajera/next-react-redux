
// outsource dependencies
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// NOTE prepare original Swal to react
const ReactSweetAlert = withReactContent(Swal);

/**
 * Origin "Swall" depend on context this is a reason to wrap it
 * and provide with ability to override prepared default options
 */
export class SweetAlertService {
  /**
     * @param {SweetAlertOptions} options
     * @returns {Promise} SweetAlertResult
     */
  static fire (options) {
    return ReactSweetAlert.fire(options);
  }

  /**
     * prepared success message
     *
     * @param {SweetAlertOptions} [options=operationSuccess]
     * @returns {Promise} SweetAlertResult
     */
  static success (options) {
    return SweetAlertService.fire({ ...operationSuccess, ...options });
  }

  /**
     * prepared error message
     *
     * @param {SweetAlertOptions} [options=operationError]
     * @returns {Promise} SweetAlertResult
     */
  static error (options) {
    return SweetAlertService.fire({ ...operationError, ...options });
  }

  /**
     * prepared confirm message
     *
     * @param {SweetAlertOptions} [options=confirmDelete]
     * @returns {Promise} SweetAlertResult
     */
  static confirm (options) {
    return SweetAlertService.fire({ ...confirmDelete, ...options });
  }

  /**
     * prepared name edit form
     *
     * @param {SweetAlertOptions} [options=inputName]
     * @returns {Promise} SweetAlertResult
     */
  static inputName (options) {
    return SweetAlertService.fire({ ...inputName, ...options });
  }
}

export default SweetAlertService;
/* ===============================================
 base configuration for different messages
 which may help define short definitions
 ================================================ */

export const confirmDelete = {
  type: 'warning',
  animation: false,
  allowEnterKey: true,
  allowEscapeKey: true,
  showCloseButton: false,
  title: 'Are you sure?',
  text: 'Please confirm deleting',
  allowOutsideClick: false,
  confirmButtonColor: '#D33D33',
  confirmButtonText: 'Yes, delete it',
  showCancelButton: true,
  cancelButtonText: 'Cancel',
  customClass: {
    // container: 'container-class',
    popup: 'animated shake',
    // header: 'header-class',
    // title: 'title-class',
    // closeButton: 'close-button-class',
    // image: 'image-class',
    // content: 'content-class',
    // input: 'input-class',
    actions: 'flex-row-reverse justify-content-start',
    // confirmButton: 'confirm-button-class',
    // cancelButton: 'cancel-button-class',
    // footer: 'footer-class',
  }
};
export const operationSuccess = {
  type: 'success',
  timer: 2 * 1000,
  animation: true,
  allowEnterKey: true,
  allowEscapeKey: true,
  title: 'Done successfully!',
  allowOutsideClick: true,
  confirmButtonColor: '#27c24c',
  confirmButtonText: 'Close',
  // customClass: { popup: 'animated tada' }
};
export const operationError = {
  type: 'error',
  timer: 2 * 1000,
  animation: false,
  allowEnterKey: true,
  allowEscapeKey: true,
  title: 'Not done !',
  allowOutsideClick: true,
  confirmButtonColor: '#f05050',
  confirmButtonText: 'Close',
  customClass: { popup: 'animated shake' }
};
export const inputName = {
  input: 'text',
  inputValue: '',
  animation: false,
  title: 'Type text',
  allowEnterKey: true,
  allowEscapeKey: true,
  showCloseButton: false,
  allowOutsideClick: true,
  confirmButtonText: 'Save',
  showCancelButton: true,
  cancelButtonText: 'Cancel',
  inputPlaceholder: 'Type name ...',
  inputValidator: () => new Promise(resolve => resolve()),
  customClass: {
    // popup: 'animated heartBeat',
    // popup: 'animated lightSpeedIn',
    popup: 'animated slideInDown',
    actions: 'flex-row-reverse justify-content-start',
  }
};
