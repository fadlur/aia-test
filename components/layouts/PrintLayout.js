import { useRouter } from 'next/router';
import Meta from './shared/Meta';

const DashLayout = (props) => {
  const router = useRouter();
  const { children, title='AIA - TEST', metaDescription='', metaImage, user, loading } = props;
  return (
    <>
      <Meta title={title} metaDescription={metaDescription} metaImage={metaImage} />
      {children}
    </>
  )
}

export default DashLayout;