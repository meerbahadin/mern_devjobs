import React, { useState } from 'react';
import { Card, Badge, Button, Collapse } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

const Job = ({ job }) => {
  const [open, setOpen] = useState(false);
  return (
    <Card className="my-3" style={{ border: 'none', background: '#f0f5f9' }}>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title>
              {job.title} - <span className="text-muted">{job.company}</span>
            </Card.Title>
            <Card.Subtitle className="text-muted my-3">
              {new Date(job.created_at).toLocaleDateString()}
            </Card.Subtitle>
            <Badge variant="warning" className="mr-2">
              {job.type}
            </Badge>
            <Badge variant="success">{job.location}</Badge>
            <div className="mt-2" style={{ wordBreak: 'break-all' }}>
              <ReactMarkdown source={job.how_to_apply} />
            </div>
          </div>
          <img
            className="d-none d-md-block"
            height="50"
            src={job.company_logo}
            alt={job.company}
          />
        </div>
        <Card.Text>
          <Button variant="dark" onClick={() => setOpen(!open)}>
            {open ? 'Hide Details' : 'Show Details'}
          </Button>
          <Collapse in={open}>
            <div className="mt-4">
              <ReactMarkdown source={job.description} />
            </div>
          </Collapse>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Job;
