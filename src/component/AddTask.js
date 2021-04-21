import { useState } from 'react'

const AddTask = ({ addTask }) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState('flase');

    const onSubmit = (e) => {
        e.preventDefault()
        if (!text) {
            alert('Please add a task')
            return
        }
        addTask({ text, day, reminder });
        setText('');
        setDay('');
        setReminder('');

    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input
                    type='text'
                    placeholder='Add Task'
                    value={text}
                    onChange={(e) => (
                        setText(e.target.value)
                    )}
                ></input>
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input
                    type='text'
                    placeholder='Day & Time'
                    value={day}
                    onChange={(e) => (
                        setDay(e.target.value)
                    )}
                ></input>
            </div>
            <div className='form-control form-control-check'>
                <label>Reminder</label>
                <input
                    type='checkbox'
                    value={reminder}
                    onChange={(e) => (
                        setReminder(e.currentTarget.checked)
                    )}
                />
            </div>
            <input type='submit' className='btn btn-block'

            />
        </form>
    )
}

export default AddTask
