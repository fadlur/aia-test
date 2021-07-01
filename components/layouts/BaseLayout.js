import Header from '@/components/layouts/shared/Header';
import Footer from '@/components/layouts/shared/Footer';
import { useRouter } from 'next/router';
import Meta from './shared/Meta';

const BaseLayout = (props) => {
  const router = useRouter();
  const { children, title='AIA TEST', metaDescription='', metaImage } = props;
  return (
    <>
      <Meta title={`${title} | AIA TEST`} metaDescription={metaDescription} metaImage={metaImage} />
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default BaseLayout;