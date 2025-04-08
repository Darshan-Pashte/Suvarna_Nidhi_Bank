import Swal from 'sweetalert2';

const SweetAlertPopup = (message, msgtype, msgicon) => {
    {
      Swal.fire({
        title: msgtype,
        text: message,
        icon: msgicon,
        customClass: {
          container: 'swal-container',
          title: 'swal-title',
          text: 'swal-text',
          icon: 'swal-icon',
        },
        allowOutsideClick: false, 
        onOpen: () => {
          // Apply inline styles directly to the elements
        
          document.querySelector('.swal-container').style.zIndex = '1500'; // Adjust the z-index value
    
         
        },

      });
    }
    
  };

export default SweetAlertPopup