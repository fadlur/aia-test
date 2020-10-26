import { useState } from "react";
import { Carousel, CarouselControl, CarouselIndicators, CarouselItem } from "reactstrap";

const SlideCarousel = (props) => {
  const {itemimage} = props;
  // carousel
  // carousel state
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  // end carousel state
  const next = (items) => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = (items) => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }
  // end carousel

  const slide = () =>
  itemimage.map((image, index) => 
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={index}>
        <img src={image.url} className="img-fluid" />
      </CarouselItem>
  )

  return (
    <Carousel
      activeIndex={activeIndex}
      next={() => next(itemimage)}
      previous={() => previous(itemimage)}
    >
      <CarouselIndicators items={itemimage} activeIndex={activeIndex} onClickHandler={goToIndex} />
      { slide(itemimage)}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={() => previous(itemimage)} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={() => next(itemimage)} />
    </Carousel>
  )
}

export default SlideCarousel;