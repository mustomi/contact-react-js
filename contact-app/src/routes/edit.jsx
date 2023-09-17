import { Form, useLoaderData, redirect, } from "react-router-dom";
import { updateContact } from '../contacts'

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact() {
  const { contact } = useLoaderData();

  return (
    <Form method="post" id="contact-form" className="ms-4 mt-5 p-4">
      <h2 className="mb-2">Edit Contact</h2>
      <hr />
      <p className="d-flex">
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
          style={{
            marginLeft: '75px',
            marginRight: '30px',
            borderRadius: '5px',
          }}
          className="form-control"
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
          style={{
            borderRadius: '5px',
          }}
          className="form-control"
        />
      </p>
      <div className="d-flex flex-column">
        <label className="mb-3 d-flex">
          <span>Twitter</span>
          <input
            type="text"
            name="twitter"
            placeholder="@jack"
            defaultValue={contact.twitter}
            className="form-control"
            style={{
              marginLeft: '67px',
              borderRadius: '5px',
            }}
          />
        </label>
        <label className="d-flex">
          <span>Avatar URL</span>
          <input
            placeholder="https://example.com/avatar.jpg"
            aria-label="Avatar URL"
            type="text"
            name="avatar"
            defaultValue={contact.avatar}
            style={{
              marginLeft: '52px',
              borderRadius: '5px',
            }}
            className="form-control"
          />
        </label>
        <label className="d-flex mt-4 mb-4">
          <span>Notes</span>
          <textarea
            name="notes"
            defaultValue={contact.notes}
            rows={6}
            cols={51}
            style={{
              marginLeft: '75px',
              borderRadius: '5px',
            }}
            className="form-control"
          />
        </label>
      </div>
      <p className="d-flex gap-3" style={{ marginLeft: '117px', }}>
        <button type="submit" className="btn btn-success">Save</button>
        <button type="button" className="btn btn-danger">Cancel</button>
      </p>
    </Form>
  );
}