import React from "react";
import {render} from "@testing-library/react";
import HomePage from "./HomePage";

test('home page render without crashing', () => {
    render(<HomePage />);
});