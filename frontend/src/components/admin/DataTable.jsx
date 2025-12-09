import React from 'react';
import { Edit, Trash2, MoreHorizontal } from 'lucide-react';

const DataTable = ({
    columns,
    data,
    onEdit,
    onDelete,
    emptyMessage = 'Veri bulunamadı'
}) => {
    if (!data || data.length === 0) {
        return (
            <div className="bg-[#16161c] border border-white/[0.06] rounded-2xl p-12 text-center">
                <p className="text-white/40">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="bg-[#16161c] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/[0.06]">
                            {columns.map((col, i) => (
                                <th
                                    key={i}
                                    className="px-5 py-4 text-left text-xs font-semibold text-white/40 uppercase tracking-wider"
                                >
                                    {col.header}
                                </th>
                            ))}
                            <th className="px-5 py-4 text-right text-xs font-semibold text-white/40 uppercase tracking-wider">
                                İşlemler
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                        {data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="hover:bg-white/[0.02] transition-colors"
                            >
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className="px-5 py-4">
                                        {col.render ? col.render(row) : (
                                            <span className="text-sm text-white/80">
                                                {row[col.accessor]}
                                            </span>
                                        )}
                                    </td>
                                ))}
                                <td className="px-5 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        {onEdit && (
                                            <button
                                                onClick={() => onEdit(row, rowIndex)}
                                                className="p-2 rounded-lg hover:bg-white/[0.06] text-white/50 hover:text-white transition-all"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                        )}
                                        {onDelete && (
                                            <button
                                                onClick={() => onDelete(row, rowIndex)}
                                                className="p-2 rounded-lg hover:bg-red-500/10 text-white/50 hover:text-red-400 transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;
