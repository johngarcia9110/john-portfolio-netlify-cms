import React from 'react'
import { navigate } from 'gatsby-link'


function encode(data) {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')
}

export default class ContactForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isValidated: false }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        const form = e.target
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({
                'form-name': form.getAttribute('name'),
                ...this.state,
            }),
        })
            .then(() => navigate(form.getAttribute('action')))
            .catch(error => alert(error))
    }

    render() {
        return (
            <div className="contact-form-container">
                <form
                    name="contact"
                    method="post"
                    action="/contact/thanks/"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={this.handleSubmit}
                >
                    {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                    <input type="hidden" name="form-name" value="contact" />
                    <div hidden>
                        <label>
                            Don’t fill this out:{' '}
                            <input name="bot-field" onChange={this.handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor={'name'}>
                            Your name
                        </label>
                        <div className="control">
                            <input
                                className="form-control"
                                type={'text'}
                                name={'name'}
                                onChange={this.handleChange}
                                id={'name'}
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor={'email'}>
                            Email
                        </label>
                        <div className="control">
                            <input
                                className="form-control"
                                type={'email'}
                                name={'email'}
                                onChange={this.handleChange}
                                id={'email'}
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor={'message'}>
                            Message
                        </label>
                        <div className="control">
                          <textarea
                              className="form-control"
                              name={'message'}
                              onChange={this.handleChange}
                              id={'message'}
                              required={true}
                              rows="10"
                          />
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-green is-link" type="submit">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
