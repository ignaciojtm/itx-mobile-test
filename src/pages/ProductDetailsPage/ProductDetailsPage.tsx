import { Link, useParams } from 'react-router-dom';

export function ProductDetailsPage() {
  const { id } = useParams();

  return (
    <section>
      <h1>Product Details (PDP)</h1>
      <p>Product id: {id}</p>
      <p>
        <Link to="/">← Back to PLP</Link>
      </p>
    </section>
  );
}
