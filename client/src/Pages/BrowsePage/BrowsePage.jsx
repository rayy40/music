import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../Authenticate/spotify";
import BrowsePageSkeleton from "../../Components/SkeletonLoading/BrowsePageSkeleton";

export default function BrowsePage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getCategories(20, "IN");
        setCategories(data.categories.items);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      {isLoading ? (
        <BrowsePageSkeleton />
      ) : (
        <div className="browse-page-container">
          {categories.map((item, index) => (
            <Link key={index} to={`/discover/${item?.id}`} className="link">
              <div className="browse-page-container__box">
                <img loading="eager" src={item?.icons?.[0]?.url} alt="icon" />
                <p className="link-tag">{item?.name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
