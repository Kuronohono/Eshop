import React, { useState, useEffect } from 'react'

const TABLE_HEAD_DATA = [
  { id: 1, label: "ID" },
  { id: 2, label: "NAME" },
  { id: 3, label: "DESCRIPTION" },
  { id: 4, label: "PRICE" },
  { id: 5, label: "ARRIVAL_DATE" },
  { id: 6, label: "DISCOUNT_PERCENTAGE" },
  { id: 7, label: "SOLD_COUNT" },
  { id: 8, label: "GENDER" },
  { id: 9, label: "PRODUCT_TYPE" },
  { id: 10, label: "DRESS_STYLE" },
  { id: 11, label: "PRODUCT_BRAND" },
];

const BASE = "http://localhost:8085";

const PRODUCT_ACTIONS = [
  { id: 1,  method: "GET",    label: "All products",    path: "/products",                                body: false },
  { id: 2,  method: "GET",    label: "Product by ID",   path: "/products/{id}",                           body: false },
  { id: 3,  method: "GET",    label: "Search",          path: "/products/search",                         body: false },
  { id: 4,  method: "GET",    label: "By status",       path: "/products/status/{status}",                body: false },
  { id: 5,  method: "GET",    label: "By type",         path: "/products/type/{type}",                    body: false },
  { id: 6,  method: "GET",    label: "By brand",        path: "/products/brands/{brand}",                  body: false },
  { id: 9,  method: "POST",   label: "Add product",     path: "/products",                                body: true,  defaultBody: '{\n  "name": "New Product",\n  "description": "Description",\n  "price": 99.99,\n  "discount": 0,\n  "soldCount": 0,\n  "imageUrls": ["https://picsum.photos/600/800"],\n  "gender": "MEN",\n  "productType": "T_SHIRT",\n  "dressStyle": "CASUAL",\n  "productBrand": "Zara",\n  "variants": []\n}' },
  { id: 10, method: "POST",   label: "Bulk add",        path: "/products/bulk",                           body: true,  defaultBody: '[\n  { "name": "", "price": 0 }\n]' },
  { id: 11, method: "PATCH",  label: "Update product",  path: "/products/{id}",                           body: true,  defaultBody: '{\n  "name": "Updated Product Name",\n  "description": "Updated description",\n  "price": 59.99,\n  "discount": 10,\n  "soldCount": 50,\n  "imageUrls": ["https://picsum.photos/600/800"],\n  "gender": "MEN",\n  "productType": "T_SHIRT",\n  "dressStyle": "CASUAL",\n  "productBrand": "Zara",\n  "variants": []\n}' },
  { id: 12, method: "DELETE", label: "Delete product",  path: "/products/{id}",                           body: false },
];

const METHOD_COLORS = {
  GET:    { bg: "bg-[#3b82f6]", text: "text-white" },
  POST:   { bg: "bg-[#22c55e]", text: "text-white" },
  PATCH:  { bg: "bg-[#f59e0b]", text: "text-white" },
  DELETE: { bg: "bg-[#ef4444]", text: "text-white" },
};
// Normalize any response shape into a row array
const normalizeToRows = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (typeof data === 'object') return [data];
  return [];
};

// Derive table columns from the union of all keys in the rows
const deriveColumns = (rows) => {
  const keys = new Set();
  rows.forEach(row => Object.keys(row).forEach(k => keys.add(k)));
  return Array.from(keys);
};

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);

  // API tester state
  const [selected, setSelected] = useState(null);
  const [requestBody, setRequestBody] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [extraHeaders, setExtraHeaders] = useState('');
  const [responseStatus, setResponseStatus] = useState(null);
  const [responseOk, setResponseOk] = useState(null);
  const [responseError, setResponseError] = useState(null);
  const [tableRows, setTableRows] = useState(null); // null = show default products
  const [tableColumns, setTableColumns] = useState(null); // null = show default columns
  const [loading, setLoading] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [pathParams, setPathParams] = useState('');
  const [pathVariables, setPathVariables] = useState('{}');
  const [queryParams, setQueryParams] = useState('');

  const PAGE_SIZE = 20;
  const [page2, setPage2] = useState(0); // separate page for response table

  useEffect(() => {
    fetch(`${BASE}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('admin_token') || '';
    if (token) setAuthToken(token);
  }, []);

  const defaultTotalPages = Math.ceil(products.length / PAGE_SIZE);
  const defaultPaginated = products.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const responseTotalPages = tableRows ? Math.ceil(tableRows.length / PAGE_SIZE) : 0;
  const responsePaginated = tableRows ? tableRows.slice(page2 * PAGE_SIZE, (page2 + 1) * PAGE_SIZE) : [];

  const isResponseMode = tableRows !== null;
  const displayRows = isResponseMode ? responsePaginated : defaultPaginated;
  const displayColumns = isResponseMode ? tableColumns : TABLE_HEAD_DATA.map(h => h.label.toLowerCase().replace(/_([a-z])/g, (_, c) => c.toUpperCase()).replace(/^id$/, 'id'));
  const displayHeaders = isResponseMode ? tableColumns : TABLE_HEAD_DATA.map(h => h.label);
  const currentPage = isResponseMode ? page2 : page;
  const totalPages = isResponseMode ? responseTotalPages : defaultTotalPages;
  const setCurrentPage = isResponseMode ? setPage2 : setPage;

  const handleSelectAction = (action) => {
    setSelected(action);
    setRequestBody(action.defaultBody || '');
    setResponseStatus(null);
    setResponseOk(null);
    setResponseError(null);
    setPanelOpen(true);
  };

  const loadAdminToken = () => {
    const token = localStorage.getItem('admin_token') || '';
    setAuthToken(token || 'No admin_token found in localStorage');
    console.log(authToken);
  };

  const replacePathVariables = (path, variables) => {
    return path.replace(/\{([^}]+)\}/g, (_, key) => {
    return variables[key] ?? `{${key}}`;
    });
  };


  const handleSend = async () => {
    if (!selected) return;
    setLoading(true);
    setResponseStatus(null);
    setResponseOk(null);
    setResponseError(null);
    setTableRows(null);
    setTableColumns(null);
    setPage2(0);

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (authToken && !authToken.startsWith('No ')) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      if (extraHeaders.trim()) {
        try {
          const extra = JSON.parse(extraHeaders);
          Object.assign(headers, extra);
        } catch {}
      }

      let finalPath = selected.path;
      console.log(finalPath);

      try {
        const vars = JSON.parse(pathParams || '{}');
        finalPath = replacePathVariables(selected.path, vars);
      } catch (e) {
        throw new Error('Invalid Path Variables JSON');
      }

      if (queryParams.trim()) {
          try {
            const qp = JSON.parse(queryParams);
            const searchString = new URLSearchParams(qp).toString();
            if (searchString) finalPath += `?${searchString}`;
          } catch (e) {
            throw new Error('Invalid Query Params JSON');
          }
      }

      const url = `${BASE}${finalPath}`;

      const options = { method: selected.method, headers };
      if (selected.body && requestBody.trim()) {
        options.body = requestBody;
      }

      const res = await fetch(url, options);
      const text = await res.text();
      let parsed;
      try { parsed = JSON.parse(text); } catch { parsed = text; }

      setResponseStatus(res.status);
      setResponseOk(res.ok);
      if (!res.ok) {
        const message = typeof parsed === 'object' && parsed?.message
          ? parsed.message
          : (typeof parsed === 'string' ? parsed : `Request failed with status ${res.status}`);
        setResponseError(message);
      }

      const rows = normalizeToRows(parsed);
      if (rows.length > 0) {
        const cols = deriveColumns(rows);
        setTableRows(rows);
        setTableColumns(cols);
      } else {
        // Non-list response (e.g. DELETE 204, single message)
        setTableRows([]);
        setTableColumns([]);
      }
    } catch (err) {
      setResponseError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetTable = () => {
    setTableRows(null);
    setTableColumns(null);
    setResponseStatus(null);
    setResponseOk(null);
    setResponseError(null);
    setPage2(0);
  };

  const renderCellValue = (val) => {
    if (val === null || val === undefined) return <span className="text-gray-400 italic">—</span>;
    if (typeof val === 'boolean') return val ? '✓' : '✗';
    if (typeof val === 'object') return <span className="text-xs text-gray-400">{JSON.stringify(val)}</span>;
    return String(val);
  };

  return (
    <div className="screen_adapt">
      
      <div className='flex w-full justify-between'>
        <h1 className="page_header">Products</h1>
        <button className='font-satoshi border px-[0.8em] py-[0.4em] rounded-[1em] cursor-pointer'>Helper</button>
      </div>

      {/* ── Quick Endpoints ── */}
      <div className="overflow-x-auto mb-2">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">Quick endpoints</h2>
        <div className="flex flex-wrap gap-2">
          {PRODUCT_ACTIONS.map(action => {
            const mc = METHOD_COLORS[action.method];
            const isActive = selected?.id === action.id;
            return (
              <button
                key={action.id}
                onClick={() => handleSelectAction(action)}
                className={`flex items-center gap-1.5 mx-1 px-3 py-1.5 rounded border text-sm font-medium transition-all cursor-pointer
                  ${isActive ? 'ring-2 ring-offset-1 ring-blue-400' : 'hover:opacity-90'}
                  bg-[#1e1e2e] border-white/10 text-white`}
              >
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${mc.bg} ${mc.text}`}>
                  {action.method}
                </span>
                {action.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── API Tester Panel ── */}
      {panelOpen && selected && (
        <div className="mb-4 border border-white/10 rounded-lg bg-[#13131f] p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${METHOD_COLORS[selected.method].bg} text-white`}>
                {selected.method}
              </span>
              <code className="text-sm text-blue-300 font-mono">{selected.path}</code>
              {responseStatus && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${responseOk ? 'bg-green-700 text-green-100' : 'bg-red-700 text-red-100'}`}>
                  {responseStatus}
                </span>
              )}
              {responseError && (
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-700 text-red-100">
                  Error
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSend}
                disabled={loading}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded disabled:opacity-50 font-semibold cursor-pointer"
              >
                {loading ? 'Sending…' : 'Send'}
              </button>
              <button
                onClick={() => setPanelOpen(false)}
                className="px-3 py-1.5 border border-white/20 text-white/60 hover:text-white text-sm rounded cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Request body */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Request body</span>
                <span className="text-xs text-gray-500">JSON</span>
              </div>
              <textarea
                className="w-full h-72 bg-[#1a1a2e] border border-white/10 rounded p-3 text-sm font-mono text-green-300 resize-y focus:outline-none focus:border-blue-500"
                placeholder={selected.body ? '{ }' : 'No body for this method'}
                value={requestBody}
                onChange={e => setRequestBody(e.target.value)}
                disabled={!selected.body}
              />
            </div>

            {/* Right: Auth + Extra headers */}
            <div className="flex flex-col gap-3">

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Auth token</span>
                  <span className="text-xs text-gray-500">from localStorage</span>
                </div>
                <textarea
                  className="w-full h-16 bg-[#1a1a2e] border border-white/10 rounded p-3 text-sm font-mono text-yellow-300 resize-none focus:outline-none focus:border-blue-500"
                  placeholder="No admin_token found in localStorage"
                  value={authToken}
                  onChange={e => setAuthToken(e.target.value)}
                />
                <div className="flex gap-2 mt-1.5">
                  <button
                    onClick={loadAdminToken}
                    className="flex items-center gap-1 px-3 py-1 bg-[#1e1e2e] border border-white/10 rounded text-xs text-white/80 hover:text-white"
                  >
                    ↻ Load admin_token
                  </button>
                  <button
                    onClick={() => setAuthToken('')}
                    className="px-3 py-1 bg-[#1e1e2e] border border-white/10 rounded text-xs text-white/80 hover:text-white"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div>
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1">Path Variables</span>
                <textarea
                  className="w-full h-20 bg-[#1a1a2e] border border-white/10 rounded p-3 text-sm font-mono text-purple-300 resize-none focus:outline-none focus:border-blue-500"
                  placeholder={`{"id": "uuid"}`}
                  value={pathParams}
                  onChange={e => setPathParams(e.target.value)}
                />
              </div>

              <div>
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1">Query Params</span>
                <textarea
                  className="w-full h-20 bg-[#1a1a2e] border border-white/10 rounded p-3 text-sm font-mono text-purple-300 resize-none focus:outline-none focus:border-blue-500"
                  placeholder={'{"query": "T-SHIRT"}'}
                  value={queryParams}
                  onChange={e => setQueryParams(e.target.value)}
                />
              </div>

              <div>
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1">Extra headers</span>
                <textarea
                  className="w-full h-20 bg-[#1a1a2e] border border-white/10 rounded p-3 text-sm font-mono text-purple-300 resize-none focus:outline-none focus:border-blue-500"
                  placeholder={'{"X-Custom": "value"}'}
                  value={extraHeaders}
                  onChange={e => setExtraHeaders(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Table Header Bar ── */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-600">
            {isResponseMode ? `Response — ${tableRows.length} row(s)` : 'Products'}
          </span>
          {responseError && (
            <span className="text-xs text-red-500 font-mono">{responseError}</span>
          )}
        </div>
        {isResponseMode && (
          <button
            onClick={handleResetTable}
            className="text-xs px-3 py-1 border rounded text-gray-500 hover:text-gray-800 hover:border-gray-400"
          >
            ← Back to products
          </button>
        )}
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        {isResponseMode && tableRows.length === 0 ? (
          <div className="py-10 text-center text-gray-400 text-sm border border-dashed rounded">
            {responseError
              ? `Request failed: ${responseError}`
              : `Request completed with status ${responseStatus} — no rows to display.`}
          </div>
        ) : (
          <table className="min-w-max border border-black/60 border-collapse">
            <thead>
              <tr>
                {displayHeaders.map((h, i) => (
                  <th key={i} className="px-4 py-2 text-left whitespace-nowrap border-3 border-black/60 bg-[#447ae0]">
                    {isResponseMode ? h.toUpperCase() : h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isResponseMode
                ? responsePaginated.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      {tableColumns.map((col, ci) => (
                        <td key={ci} className="td_item">{renderCellValue(row[col])}</td>
                      ))}
                    </tr>
                  ))
                : defaultPaginated.map((product, index) => (
                    <tr key={product.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="td_item">{product.id}</td>
                      <td className="td_item">{product.name}</td>
                      <td className="td_item">{product.description}</td>
                      <td className="td_item">{product.price}</td>
                      <td className="td_item">{product.arrivalDate}</td>
                      <td className="td_item">{product.discount}%</td>
                      <td className="td_item">{product.soldCount}</td>
                      <td className="td_item">{product.gender}</td>
                      <td className="td_item">{product.productType}</td>
                      <td className="td_item">{product.dressStyle}</td>
                      <td className="td_item">{product.productBrand}</td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        )}
      </div>

      {/* ── Pagination ── */}
      <div className="flex items-center gap-2 mt-4 w-full justify-center">
        <button onClick={() => setCurrentPage(0)} disabled={currentPage === 0} className="px-3 py-1 border rounded disabled:opacity-40 ">«</button>
        <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 0} className="px-3 py-1 border rounded disabled:opacity-40">‹ Previous</button>
        <span className="text-sm">Page {currentPage + 1} of {totalPages || 1}</span>
        <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage >= totalPages - 1} className="px-3 py-1 border rounded disabled:opacity-40">Next ›</button>
        <button onClick={() => setCurrentPage(totalPages - 1)} disabled={currentPage >= totalPages - 1} className="px-3 py-1 border rounded disabled:opacity-40">»</button>
      </div>
    </div>
  );
};