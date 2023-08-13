import { Coord } from "../types/ICard";
import { IError } from "../types/IError";
import { ICard } from "../types/ICard";
import { ICity } from "../types/ICity";
const apiKey = "a6dbcc7c2f40099a3e99982ce9d1dbc6";

const getWetherByPosition = async (
  position: Coord
): Promise<ICard | IError> => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lon}&units=metric&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    const responseData = await response.json();
    if (responseData.cod == 200) {
      // responseData.error = { status: false };
      return responseData;
    } else {
      return {
        error: {
          status: true,
          errorText: responseData.message,
        },
      };
    }
  } catch (error) {
    return {
      error: {
        status: true,
        errorText: `${error}`,
      },
    };
  }
};

const getPositionByCity = async (city: string): Promise<IError | ICity[]> => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    const responseData = await response.json();
    if (responseData.message) {
      return {
        error: {
          status: true,
          errorText: responseData.message,
        },
      };
    } else if (!responseData.length) {
      return {
        error: {
          status: true,
          errorText: "Nothing found",
        },
      };
    } else if (responseData.length) {
      return responseData;
    } else {
      return {
        error: {
          status: true,
          errorText: "Error ",
        },
      };
    }
  } catch (error) {
    return {
      error: {
        status: true,
        errorText: `${error}`,
      },
    };
  }
};

export { getWetherByPosition, getPositionByCity };
