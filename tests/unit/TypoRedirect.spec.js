import { shallowMount } from "@vue/test-utils";
import TypoRedirect from "@/components/TypoRedirect.vue";

describe("TypoRedirect.vue", () => {
  it("redirect test cases succesfully with empty routes prop", () => {
    const testCases = [
      {
        path: "/chayy",
        fullPath: "/chayy",
        query: {},
        result: "/chat",
      },
      {
        path: "/chayy/123",
        fullPath: "/chayy/123",
        query: {},
        result: "/chat/123",
      },
      {
        path: "/chayy",
        fullPath: "/chayy?window=open",
        query: { window: "open" },
        result: "/chat?window=open",
      },
      {
        path: "/chayy/123",
        fullPath: "/chayy/123?window=me",
        query: { window: "open" },
        result: "/chat/123?window=me",
      },
    ];

    for (const testCase of testCases) {
      const mockRouter = {
        push: jest.fn(),
        options: {
          routes: [
            { path: "/about", component: {}, props: {} },
            { path: "/chat", component: {}, props: {} },
            { path: "/block", component: {}, props: {} },
            { path: "/chat/:id", component: {}, props: {} },
          ],
        },
      };

      shallowMount(TypoRedirect, {
        mocks: {
          $router: mockRouter,
        },
        propsData: {
          currentRoute: {
            path: testCase.path,
            fullPath: testCase.fullPath,
            query: testCase.query,
          },
        },
      });

      expect(mockRouter.push).toHaveBeenCalledTimes(1);
      expect(mockRouter.push).toHaveBeenCalledWith(testCase.result);
    }
  });

  it("redirect test cases succesfully", () => {
    const testCases = [
      {
        path: "/chayy",
        fullPath: "/chayy",
        query: {},
        result: "/chat",
      },
      {
        path: "/chayy/123",
        fullPath: "/chayy/123",
        query: {},
        result: "/chat/123",
      },
      {
        path: "/chayy",
        fullPath: "/chayy?window=open",
        query: { window: "open" },
        result: "/chat?window=open",
      },
      {
        path: "/chayy/123",
        fullPath: "/chayy/123?window=me",
        query: { window: "open" },
        result: "/chat/123?window=me",
      },
    ];

    for (const testCase of testCases) {
      const mockRouter = {
        push: jest.fn(),
      };

      shallowMount(TypoRedirect, {
        mocks: {
          $router: mockRouter,
        },
        propsData: {
          currentRoute: {
            path: testCase.path,
            fullPath: testCase.fullPath,
            query: testCase.query,
          },
          routes: ["/about", "/chat", "/chat/:id", "/block"],
        },
      });

      expect(mockRouter.push).toHaveBeenCalledTimes(1);
      expect(mockRouter.push).toHaveBeenCalledWith(testCase.result);
    }
  });

  it("redirect to the given wildcard component", () => {
    const testCase = {
      path: "/chay",
      fullPath: "/chay",
      query: {},
      result: "/chat",
    };

    const mockRouter = {
      push: jest.fn(),
    };

    shallowMount(TypoRedirect, {
      mocks: {
        $router: mockRouter,
      },
      propsData: {
        currentRoute: {
          path: testCase.path,
          fullPath: testCase.fullPath,
          query: testCase.query,
        },
        routes: ["/about", "/chat/:id", "/block"],
        wildcardRoute: "/wildcard",
      },
    });

    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith("/wildcard");
  });
});
