import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { Slide } from 'react-awesome-reveal'

export default function Home() {
  const [featuredGroups, setFeaturedGroups] = useState([])

  const slides = [
    {
      title: 'পড়াশোনা এবং বইয়ের ক্লাব',
      subtitle: 'সপ্তাহে একবার মিটিং — নতুন বই, মুক্ত আলোচনা।',
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=60'
    },
    {
      title: 'পাহাড়ি হাঁটা গ্রুপ',
      subtitle: 'প্রতিটি মাসে একটি দিনের ট্রেক—নতুন বন্ধু ও অ্যাডভেঞ্চার।',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=60'
    },
    {
      title: 'ওয়াটার কালার আর্ট সার্কেল',
      subtitle: 'শুক্রবার সন্ধ্যায় অনলাইনে লাইভ ওয়ার্কশপ।',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1400&q=60'
    }
  ]

  useEffect(() => {
    fetch("http://localhost:3000/allGroups")
      .then(res => res.json())
      .then(data => setFeaturedGroups(data))
  }, [])

  return (
    <Slide className="space-y-12">

      {/* Banner / Slider */}
      <section className="w-full">
        <div className="carousel w-full rounded-lg overflow-hidden">
          {slides.map((s, idx) => (
            <div key={idx} id={`slide-${idx}`} className="carousel-item relative w-full">
              <img src={s.image} className="w-full h-[250px] sm:h-[350px] md:h-[420px] object-cover" alt={s.title} />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex items-center">
                <div className="container mx-auto px-4 sm:px-6 md:px-12 text-white">
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold">{s.title}</h2>
                  <p className="mt-2 text-xs sm:text-sm md:text-lg max-w-xl">{s.subtitle}</p>
                  <div className="mt-4 sm:mt-6 flex gap-2">
                    <button className="btn btn-primary btn-sm sm:btn-md">Join Group</button>
                    <button className="btn btn-ghost btn-sm sm:btn-md">Learn more</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {slides.map((_, i) => (
            <a key={i} href={`#slide-${i}`} className="btn btn-xs">{i + 1}</a>
          ))}
        </div>
      </section>

      {/* Featured Groups */}
      <section className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h3 className="text-xl sm:text-2xl font-semibold">Featured Groups — চলমান গ্রুপ</h3>
          <Link to="/allGroups" className="btn btn-sm btn-outline">View All Groups</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGroups.map(g => {
            const isActive = new Date(g.startDate) >= new Date();
            return (
              <div key={g._id} className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
                <figure>
                  <img src={g.imageURL} alt={g.groupName} className="h-48 sm:h-60 w-full object-cover" />
                </figure>
                <div className="card-body">
                  <h4 className="card-title flex items-center justify-between text-base sm:text-lg">
                    {g.groupName}
                    <div className="badge badge-primary">{g.maxMembers} সদস্য</div>
                  </h4>
                  <p className="text-xs sm:text-sm text-muted">শুরুর তারিখ: {g.startDate}</p>
                  <div className="card-actions justify-between mt-4">
                    <span className={`text-xs badge ${isActive ? "badge-success" : "badge-error"}`}>
                      {isActive ? "চলমান" : "সময় শেষ"}
                    </span>
                    <div className="flex gap-2">
                      {isActive ? (
                        <button className="btn btn-xs sm:btn-sm btn-primary">Join</button>
                      ) : (
                        <button className="btn btn-xs sm:btn-sm btn-disabled cursor-not-allowed">Closed</button>
                      )}
                      <Link to={`/groupDetails/${g._id}`} className="btn btn-xs sm:btn-sm btn-ghost">
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Static Section 1 */}
      <section className="bg-base-200 py-12">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 grid gap-8 md:gap-6 md:grid-cols-2 items-center">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">About HobbyHub</h3>
            <p className="text-sm sm:text-base text-muted mb-4">HobbyHub হলো একটি কমিউনিটি-ফার্স্ট প্ল্যাটফর্ম যেখানে স্থানীয় আগ্রহভিত্তিক গ্রুপ খুঁজে পাওয়া, যোগদান করা এবং নিজে একটি গ্রুপ তৈরি করা যায়।</p>
            <ul className="list-disc pl-5 text-xs sm:text-sm">
              <li>সহজ গ্রুপ অনুসন্ধান</li>
              <li>ইভেন্ট ও ওয়ার্কশপ সুবিধা</li>
              <li>নতুন বন্ধু তৈরি সুযোগ</li>
            </ul>
            <div className="mt-6">
              <Link to="/create-group" className="btn btn-primary btn-sm sm:btn-md">Get Started</Link>
            </div>
          </div>

          <div>
            <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=60" className="rounded-lg shadow-lg h-52 sm:h-64 w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Static Section 2 */}
      <section className="container mx-auto px-4 sm:px-6 md:px-12 py-12">
        <h3 className="text-2xl sm:text-3xl font-semibold mb-6">Why join HobbyHub?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6 bg-base-100 shadow text-center">
            <div className="text-lg sm:text-2xl font-bold mb-2">Local & Friendly</div>
            <p className="text-xs sm:text-sm text-muted">স্থানীয় কমিউনিটি — ঘরোয়া পরিবেশে বন্ধুত্ব ও সংযোগ।</p>
          </div>

          <div className="card p-6 bg-base-100 shadow text-center">
            <div className="text-lg sm:text-2xl font-bold mb-2">Events & Workshops</div>
            <p className="text-xs sm:text-sm text-muted">নিয়মিত মিটআপ ও স্কিল শেয়ারিং সুযোগ।</p>
          </div>

          <div className="card p-6 bg-base-100 shadow text-center">
            <div className="text-lg sm:text-2xl font-bold mb-2">Create Your Own Group</div>
            <p className="text-xs sm:text-sm text-muted">নিজের শখ শেয়ার করুন, গ্রুপ তৈরি করুন, সদস্য পান।</p>
          </div>
        </div>
      </section>
    </Slide>
  )
}
