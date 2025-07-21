import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import "../styles/tour.css";
import TourCard from "../shared/TourCard";
import { Container, Row, Col } from "reactstrap";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [tourCount, setTourCount] = useState(0);

  const {
    data: tours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours?page=${page}`);

  useEffect(() => {
    const fetchTourCount = async () => {
      try {
        const response = await fetch(`${BASE_URL}/tours/count`);
        const result = await response.json();
        const total = Number(result.count);
        setTourCount(total);
        setPageCount(Number.isFinite(total) && total > 0 ? Math.ceil(total / 8) : 0);
      } catch (err) {
        console.error("Failed to fetch tour count:", err);
        setPageCount(0);
      }
    };
    fetchTourCount();
  }, []);

  return (
    <>
      <CommonSection title={"All Tours"} />
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading...</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && tours.length === 0 && <h5 className="text-center pt-5">No tours found</h5>}
          {!loading && !error && (
            <Row>
              {tours?.map((tour) => (
                <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}

              {Number.isFinite(pageCount) && pageCount > 0 && (
                <Col lg="12">
                  <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                    {[...Array(pageCount).keys()].map((number) => (
                      <span
                        key={number}
                        onClick={() => setPage(number)}
                        className={page === number ? "active_page" : ""}
                        style={{ cursor: "pointer" }}
                      >
                        {number + 1}
                      </span>
                    ))}
                  </div>
                </Col>
              )}
            </Row>
          )}
        </Container>
      </section>
    </>
  );
};

export default Tours;
