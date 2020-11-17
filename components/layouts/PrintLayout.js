import { useRouter } from 'next/router';
import Meta from './shared/Meta';

const DashLayout = (props) => {
  const router = useRouter();
  const { children, title='epkwt', metaDescription='', metaImage, user, loading } = props;
  return (
    <>
      <Meta title={title} metaDescription={metaDescription} metaImage={metaImage} />
      {children}
    </>
  )
}

export default DashLayout;