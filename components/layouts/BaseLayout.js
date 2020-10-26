import Header from '@/components/layouts/shared/Header';
import Footer from '@/components/layouts/shared/Footer';
import { useRouter } from 'next/router';
import Meta from './shared/Meta';

const BaseLayout = (props) => {
  const router = useRouter();
  const { children, title='E-PKWT', metaDescription='', metaImage } = props;
  return (
    <>
      <Meta title={`${title} | E-PKWT`} metaDescription={metaDescription} metaImage={metaImage} />
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default BaseLayout;