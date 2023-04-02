import React from 'react'

const AboutArtist = () => {
  return (
    <>
        <section className='about-artist-container'>
            <div className='artist-pic-container'>
              <img src={require('../images/potrait.jpg')} className='artist-pic'/>
            </div>

            <div className='artist-about-container'>
                <div className='about-text-container'>
                  <h1 style={{color: 'white'}}>
                    Lorem ipsum dolor sit amet
                  </h1>

                  <p>
                  Nam eros nulla, tempor quis commodo ut, ultricies nec mauris. Donec sit amet ultrices libero, ut ornare ex. Fusce at purus nec lorem sodales posuere. Vestibulum porttitor posuere blandit. Integer laoreet, justo non tristique accumsan, quam ligula sodales nunc, id interdum justo ligula vel dolor. Praesent porttitor ornare massa, quis aliquam nibh vehicula sed.
                  </p>
                </div>
            </div>
        </section>
    </>
  )
}

export default AboutArtist