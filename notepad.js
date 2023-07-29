$(document).ready(function () {
    function saveNote(title, notes, datetime) {
      const notesArray = getNotesArray();
      notesArray.push({ title, notes, datetime });
      localStorage.setItem('notes', JSON.stringify(notesArray)); // LocalStorage'a notları kaydediyoruz
      showNotes();
    }
  
    function getNotesArray() {
      const notesString = localStorage.getItem('notes');
      return notesString ? JSON.parse(notesString) : [];
    }
  
    function showNotes() {
      const notesArray = getNotesArray();
      const notesList = $('#notesList');
      notesList.empty();
  
      notesArray.forEach(function (note, index) {
        const noteElement = $('<li class="list-group-item"></li>');
        const datetime = note.datetime ? new Date(note.datetime).toLocaleString() : '';
        noteElement.html(`
          <div>
            <strong>${note.title}</strong>: ${note.notes}
          </div>
          <div>
            <small>${datetime}</small>
            <span class="delete" onclick="deleteNote(${index})">Delete</span>
          </div>
        `);
        notesList.append(noteElement);
      });
    }
  
    function deleteNote(index) {
      const notesArray = getNotesArray();
      notesArray.splice(index, 1);
      localStorage.setItem('notes', JSON.stringify(notesArray)); // LocalStorage'a güncellenmiş notları kaydediyoruz
      showNotes();
    }
  
    $('#noteForm').on('submit', function (e) {
      e.preventDefault();
      const title = $('#title').val();
      const notes = $('#notes').val();
      const datetime = $('#datetime').val();
  
      if (title.trim() === '' || notes.trim() === '') {
        alert('Title and Note can not be Empty');
        return;
      }
  
      saveNote(title, notes, datetime);
  
      // Formu temizle
      $('#title').val('');
      $('#notes').val('');
      $('#datetime').val('');
    });
  
    $('#clearBtn').on('click', function () {
      localStorage.removeItem('notes'); // LocalStorage'dan notları kaldırıyoruz
      showNotes();
    });
  
    // Sayfa yüklendiğinde notları göster
    showNotes();
  });
  
