import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getPosts } from '../../actions/post';
import PostItem from '../posts/PostItem';

const Landing = ({ isAuthenticated, post: { posts, loading }, getPosts }) => {
  useEffect(() => {
    if (isAuthenticated) {
      return <Redirect to='/dashboard' />;
    }
    getPosts();
  }, []);

  return (
    <section className='flex mt-40 md:mt-0 w-full h-screen  '>
      <div class='md:flex space-x-10 md:mr-0 mr-10'>
        <div class='md:flex items-center pl-16 '>
          <div class=''>
            <h1 class='lg:text-5xl text-green-500 font-bold leading-tight text-3xl'>
              The Meeting Place for Music Lovers
            </h1>
            <p class='mt-4 text-lg font-normal '>
              See what music your friends are currently listening to. <br />{' '}
              Recommend your new favorite songs to friends.
            </p>
            <Link
              to='/register'
              class='flex mt-10 w-56   items-center space-x-3 p-1 bg-green-600 text-white rounded-lg  transition-all duration-400 transform hover:scale-105 cursor-pointer hover:shadow-lg'
            >
              <button class='text-lg text-md '>Let's get started</button>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  class='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M11 19l-7-7 7-7m8 14l-7-7 7-7'
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        <div class='w-11/12 mt-20 overflow-y-hidden pr-16 md:flex md:flex-col gap-y-10 hidden'>
          <h1 className='text-center text-xl -mb-10 font-bold text-green-500'>
            Latest Feed
          </h1>
          {posts
            .sort(function (a, b) {
              return new Date(b.date_added) - new Date(a.date_added); // sort post from recent to old
            })
            .slice(0, 3)
            .map((post) => (
              <PostItem key={post.id} post={post} showActions={false} />
            ))}

          {/* <svg
            id='a5531c2a-42c0-48e3-8177-211774c58b20'
            data-name='Layer 1'
            xmlns='http://www.w3.org/2000/svg'
            width='834.39846'
            height='597.28291'
            viewBox='0 0 834.39846 597.28291'
          >
            <path
              d='M244.97278,747.17879l-2-.03907a463.83344,463.83344,0,0,1,7.09961-66.2871c8.64844-46.88086,23.0293-77.66993,42.74317-91.51172l1.14844,1.63672C247.91224,623.3116,244.99622,745.94344,244.97278,747.17879Z'
              transform='translate(-182.80077 -151.35854)'
              fill='#f1f1f1'
            />
            <path
              d='M269.97278,746.70027l-2-.03906c.043-2.21484,1.293-54.41406,21.84278-68.8418l1.14844,1.63672C271.24329,693.30183,269.98255,746.16805,269.97278,746.70027Z'
              transform='translate(-182.80077 -151.35854)'
              fill='#f1f1f1'
            />
            <circle cx='122.54116' cy='429.8007' r='10.00001' fill='#f1f1f1' />
            <circle cx='117.58901' cy='515.80073' r='10' fill='#f1f1f1' />
            <path
              d='M265.31156,597.15382c1.87935,12.004-3.01891,22.7406-3.01891,22.7406s-7.94529-8.72583-9.82464-20.72985,3.0189-22.7406,3.0189-22.7406S263.4322,585.1498,265.31156,597.15382Z'
              transform='translate(-182.80077 -151.35854)'
              fill='#f1f1f1'
            />
            <path
              d='M297.99872,626.30763c-11.493,3.9422-22.91877.98963-22.91877.98963s7.20793-9.34412,18.70088-13.28632,22.91879-.98962,22.91879-.98962S309.49168,622.36543,297.99872,626.30763Z'
              transform='translate(-182.80077 -151.35854)'
              fill='#f1f1f1'
            />
            <path
              d='M298.368,702.46877a31.13467,31.13467,0,0,1-16.06421.69366,28.37373,28.37373,0,0,1,29.172-10.00629A31.13421,31.13421,0,0,1,298.368,702.46877Z'
              transform='translate(-182.80077 -151.35854)'
              fill='#f1f1f1'
            />
            <circle cx='676.37646' cy='158.022' r='158.022' fill='#f1f1f1' />
            <polygon
              points='692.179 99.191 692.179 165.34 596.02 165.34 578.256 186.654 580.284 165.34 571.641 165.34 571.641 99.191 692.179 99.191'
              fill='#4caf50'
            />
            <rect
              x='648.81448'
              y='121.97532'
              width='43.36418'
              height='43.36418'
              opacity='0.1'
            />
            <polygon
              points='658.369 131.53 778.907 131.53 778.907 197.679 770.262 197.679 772.292 218.994 754.53 197.679 658.369 197.679 658.369 131.53'
              fill='#4caf50'
            />
            <ellipse
              cx='578.9908'
              cy='194.73894'
              rx='26.4595'
              ry='2.58142'
              opacity='0.1'
            />
            <ellipse
              cx='772.29214'
              cy='229.28328'
              rx='30.13443'
              ry='2.93994'
              opacity='0.1'
            />
            <path
              d='M411.34459,594.75514h48.35623c0,2.072,52.85979,3.75355,52.85979,3.75355a19.30984,19.30984,0,0,1,3.1678,3.00285,18.63313,18.63313,0,0,1,4.35471,12.01138v3.00285a18.7747,18.7747,0,0,1-18.76779,18.76778H411.34459a18.7841,18.7841,0,0,1-18.76779-18.76778v-3.00285A18.79388,18.79388,0,0,1,411.34459,594.75514Z'
              transform='translate(-182.80077 -151.35854)'
              fill='#3f3d56'
            />
            <rect
              x='263.70826'
              y='483.18943'
              width='19.5185'
              height='112.66171'
              fill='#3f3d56'
            />
            <path
              d='M521.58018,746.524c0,2.1089-29.57723.81578-66.06261.81578S389.455,748.633,389.455,746.524s29.57723-18.83285,66.06261-18.83285S521.58018,744.415,521.58018,746.524Z'
              transform='translate(-182.80077 -151.35854)'
              fill='#3f3d56'
            />
            <polygon
              points='351.891 582.293 366.417 582.292 373.328 526.261 351.888 526.262 351.891 582.293'
              fill='#9f616a'
            />
            <path
              d='M530.98629,728.90828l28.60789-.00115h.00116a18.23217,18.23217,0,0,1,18.23119,18.2309v.59244l-46.83937.00173Z'
              transform='translate(-182.80077 -151.35854)'
              fill='#2f2e41'
            />
            <polygon
              points='394.825 582.293 409.352 582.292 416.262 526.261 394.823 526.262 394.825 582.293'
              fill='#9f616a'
            />
            <path
              d='M573.92041,728.90828l28.60789-.00115h.00116a18.23217,18.23217,0,0,1,18.23119,18.2309v.59244l-46.83937.00173Z'
              transform='translate(-182.80077 -151.35854)'
              fill='#2f2e41'
            />
            <path
              d='M527.06693,556.31914a11.04457,11.04457,0,0,0-14.24276-9.16274l-16.16731-19.38069L482.483,534.728l23.21578,27.04863a11.10442,11.10442,0,0,0,21.36814-5.4575Z'
              transform='translate(-182.80077 -151.35854)'
              fill='#9f616a'
            />
            <polygon
              points='289.9 290.006 299.382 293.899 301.678 320.687 327.078 390.153 305.505 397.333 281.538 350.736 289.9 290.006'
              fill='#cbcbcb'
            />
            <circle cx='265.2751' cy='233.78055' r='25.25748' fill='#9f616a' />
            <path
              d='M444.19016,373.38612s1.10843-15.34393,14.78242-9.08753,12.78173-10.98827,8.64954-14.03561-4.00135-3.80145-19.11449-1.76259-44.45448,5.49332-34.96714,35.88132S437,406.85854,437,406.85854s-12.921-27.25138-5.27993-22.04166l7.64107,5.20973,4.03223-.85407Z'
              transform='translate(-182.80077 -151.35854)'
              fill='#2f2e41'
            />
            <path
              d='M425.82093,383.47909l-5.14724-27.863a3.81063,3.81063,0,0,1,3.05553-4.43979l6.03651-1.11518,5.83956,31.61071Z'
              transform='translate(-182.80077 -151.35854)'
              fill='#4caf50'
            />
            <circle cx='248.81947' cy='236.45938' r='11.48067' fill='#4caf50' />
            <circle cx='248.81947' cy='236.45938' r='6.8884' fill='#f2f2f2' />
            <circle cx='248.81947' cy='236.45938' r='2.29613' fill='#4caf50' />
            <path
              d='M406.62242,558.87372s-8.4747,44.81262,23.77,50.5192,78.79068,9.71727,78.79068,9.71727l20.90228,97.522,28.0818-2.50707s-3.73477-117.39473-12.9193-126.57926-52.85443-36.06239-52.85443-36.06239Z'
              transform='translate(-182.80077 -151.35854)'
              fill='#2f2e41'
            />
            <path
              d='M469.59846,540.09243l14.10233,14.14744s101.82677,16.40159,105.755,39.9202c5.93069,35.50753,12.93578,112.7211,12.93578,112.7211L571.77645,704.585l-12.00545-87.771L510.78668,605.6717l-55.7304-30.37187Z'
              transform='translate(-182.80077 -151.35854)'
              fill='#2f2e41'
            />
            <path
              d='M468.814,431.606l-8.19147-10.86059-26.56409-.43469,0,0a51.74986,51.74986,0,0,0-27.436,45.68243v68.7205S407,543.85854,405,564.85854c-1.72568,18.11959,94.70079-10.61867,94.70079-10.61867L487.1831,452.25775S488.18907,436.0129,468.814,431.606Z'
              transform='translate(-182.80077 -151.35854)'
              fill='#cbcbcb'
            />
            <path
              d='M493.12138,579.03443a11.04456,11.04456,0,0,0-14.24275-9.16273L462.71131,550.491l-14.17385,6.95231,23.21579,27.04862a11.10441,11.10441,0,0,0,21.36813-5.4575Z'
              transform='translate(-182.80077 -151.35854)'
              fill='#9f616a'
            />
            <path
              d='M426.04156,442.71557l-8.41914-2.80237s-10.092,2.2208-16.07294,15.8138.10562,69.08291.10562,69.08291l61.985,53.52223L475.378,556.37423,441,509.85854S455.74919,459.7377,426.04156,442.71557Z'
              transform='translate(-182.80077 -151.35854)'
              fill='#cbcbcb'
            />
            <path
              d='M686.80077,748.64146h-503a1,1,0,0,1,0-2h503a1,1,0,0,1,0,2Z'
              transform='translate(-182.80077 -151.35854)'
              fill='#cbcbcb'
            />
          </svg> */}
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  post: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Landing);

{
  /* <section className='landing'>
<div className='landing-inner mx-0'>
  <h1 className='mb-1 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-black to-blue-500'>
    The Meeting Place for Music Lovers
  </h1>
  <p className='lead my-1'>
    See what music your friends are currently listening to. Recommend your
    new favorite songs to friends.
  </p>
  <div className='buttons my-1'>
    <Link
      to='/register'
      className='btn btn-primary hover:bg-green-300 hover:-translate-y-0.5 focus:outline-none focus:ring transform transition'
    >
      Let's Get Started
    </Link>
  </div>
  <div className='iphone bg-gray-500 w-1/2 rounded-3xl border-gray-900 border-4'></div>
</div>
</section> */
}
