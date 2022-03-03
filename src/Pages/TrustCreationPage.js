import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const TrustCreationPage = () => {
  const [trustName, setTrustName] = useState("");
  const history = useHistory();
  const url = process.env.REACT_APP_BACKEND_URL + "trusts/register/";

  async function submit(history) {
    const postUrl = url + "name=" + trustName;
    axios.post(postUrl).then((response) => {
      const successful = response.data;
      if (successful) {
        history.push("/home");
      } else {
        history.push("/loginFail");
        //waiting for invalid page to be wrote
      }
    });
  }

  return (
    <div>
      <Form>
        <Form.Group id="trustName">
          <Form.Label>Trust Name</Form.Label>
          <Form.Control
            type="trustName"
            placeholder="Enter trust's name"
            value={trustName}
            onChange={(e) => setTrustName(e.target.value)}
          />
        </Form.Group>
      </Form>
      <Button id="submitButton" type="submit" onClick={() => submit(history)}>
        Submit
      </Button>
    </div>
  );
};

export default TrustCreationPage;
